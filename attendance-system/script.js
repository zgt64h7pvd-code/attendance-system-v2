const addUserBtn = document.getElementById("addUserBtn");

const newUserName = document.getElementById("newUserName");
const userSelect = document.getElementById("userSelect");

const clockInBtn = document.getElementById("clockInBtn");
const clockOutBtn = document.getElementById("clockOutBtn");
const breakStartBtn = document.getElementById("breakStartBtn");
const breakEndBtn = document.getElementById("breakEndBtn");
const cancelBtn = document.getElementById("cancelBtn");

const scheduledList = document.getElementById("scheduledList");
const finishedList = document.getElementById("finishedList");

const recordList = document.getElementById("recordList");

const result = document.getElementById("result");


// 残業申請
const overtimeModal =
    document.getElementById("overtimeModal");

const overtimeUser =
    document.getElementById("overtimeUser");

const overtimeReason =
    document.getElementById("overtimeReason");

const managerSelect =
    document.getElementById("managerSelect");

const submitOvertimeBtn =
    document.getElementById("submitOvertimeBtn");


// ユーザー情報
let users = {};


// 打刻履歴
let records = [];


// 時間取得
function getCurrentTime() {

    const now = new Date();

    return now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
}


// 状態リスト更新
function updateLists() {

    scheduledList.innerHTML = "";
    finishedList.innerHTML = "";

    for (const name in users) {

        const li = document.createElement("li");

        li.textContent =
            `${name}  ${users[name].time}`;

        // 出勤予定
        if (users[name].status === "scheduled") {

            scheduledList.appendChild(li);
        }

        // 退勤済み
        else if (users[name].status === "finished") {

            finishedList.appendChild(li);
        }
    }
}


// ログ追加
function addLog(message, name = null, previousData = null) {

    const li = document.createElement("li");

    li.classList.add("log-item");

    li.textContent = message;

    recordList.prepend(li);

    records.push({
        element: li,
        userName: name,
        previous: previousData
    });
}


// 名前登録
addUserBtn.addEventListener("click", () => {

    const name = newUserName.value.trim();

    if (name === "") {

        result.textContent = "名前を入力してください";

        return;
    }

    if (users[name]) {

        result.textContent = "すでに登録されています";

        return;
    }

    users[name] = {

        status: "scheduled",

        time: "-",

        startTime: null,

        overtimeApproved: false
    };

    const option = document.createElement("option");

    option.value = name;
    option.textContent = name;

    userSelect.appendChild(option);

    updateLists();

    newUserName.value = "";

    result.textContent = `${name} を登録しました`;
});


// 出勤
clockInBtn.addEventListener("click", () => {

    const name = userSelect.value;

    if (name === "") {

        result.textContent = "ユーザーを選択してください";

        return;
    }

    if (users[name].status !== "scheduled") {

        result.textContent = "出勤できません";

        return;
    }

    const previousData = { ...users[name] };

    const time = getCurrentTime();

    users[name] = {

        status: "working",

        time: time,

        startTime: new Date(),

        overtimeApproved: false
    };

    addLog(
        `${time}  ${name} が出勤しました`,
        name,
        previousData
    );

    updateLists();

    result.textContent = `${name} が出勤しました`;
});


clockOutBtn.addEventListener("click", () => {

    const name = userSelect.value;

    if (name === "") {

        result.textContent =
            "ユーザーを選択してください";

        return;
    }

    if (users[name].status === "break") {

        result.textContent =
            "休憩中です";

        return;
    }

    if (users[name].status !== "working") {

        result.textContent =
            "勤務中ではありません";

        return;
    }

    const now = new Date();

    const diff =
        now - users[name].startTime;

    // 5時間
    const fiveHours =
        1000;

    // 残業申請が必要
    if (
        diff >= fiveHours &&
        !users[name].overtimeApproved
    ) {

        overtimeModal.style.display =
            "flex";

        overtimeUser.textContent =
            `${name} の残業申請`;

        overtimeModal.dataset.user =
            name;

        return;
    }

    completeClockOut(name);
});


// 休憩入り
breakStartBtn.addEventListener("click", () => {

    const name = userSelect.value;

    if (name === "") {

        result.textContent = "ユーザーを選択してください";

        return;
    }

    if (users[name].status !== "working") {

        result.textContent = "勤務中ではありません";

        return;
    }

    const previousData = { ...users[name] };

    const time = getCurrentTime();

    users[name] = {

        ...users[name],

        status: "break",

        time: time
    };

    addLog(
        `${time}  ${name} が休憩に入りました`,
        name,
        previousData
    );

    result.textContent = `${name} が休憩入りしました`;
});


// 休憩戻り
breakEndBtn.addEventListener("click", () => {

    const name = userSelect.value;

    if (name === "") {

        result.textContent = "ユーザーを選択してください";

        return;
    }

    if (users[name].status !== "break") {

        result.textContent = "休憩中ではありません";

        return;
    }

    const previousData = { ...users[name] };

    const time = getCurrentTime();

    users[name] = {

        ...users[name],

        status: "working",

        time: time
    };

    addLog(
        `${time}  ${name} が休憩から戻りました`,
        name,
        previousData
    );

    result.textContent = `${name} が休憩から戻りました`;
});


// 前回打刻取り消し
cancelBtn.addEventListener("click", () => {

    if (records.length === 0) {

        result.textContent = "取り消す履歴がありません";

        return;
    }

    const lastRecord = records.pop();

    // ログ削除
    lastRecord.element.remove();

    // 状態を元に戻す
    if (lastRecord.userName) {

        users[lastRecord.userName] =
            lastRecord.previous;
    }

    updateLists();

    result.textContent =
        "前回打刻を取り消しました";
});


function completeClockOut(name) {

    const previousData = { ...users[name] };

    const time = getCurrentTime();

    users[name] = {

        ...users[name],

        status: "finished",

        time: time
    };

    addLog(
        `${time}  ${name} が退勤しました`,
        name,
        previousData
    );

    updateLists();

    result.textContent =
        `${name} が退勤しました`;
}

// 残業申請
submitOvertimeBtn.addEventListener("click", () => {

    const name =
        overtimeModal.dataset.user;

    const reason =
        overtimeReason.value.trim();

    const manager =
        managerSelect.value;

    if (reason === "") {

        result.textContent =
            "残業理由を入力してください";

        return;
    }

    if (manager === "") {

        result.textContent =
            "許可者を選択してください";

        return;
    }

    users[name].overtimeApproved = true;

addLog(
    `${getCurrentTime()}  ${name} が残業申請しました（許可者:${manager}）`
);

overtimeModal.style.display = "none";

overtimeReason.value = "";

managerSelect.value = "";

// 退勤処理
completeClockOut(name);
});