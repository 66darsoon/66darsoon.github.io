//引用另一個Js檔案(modal.js)
var new_element = document.createElement("script");
new_element.setAttribute("type", "text/javascript");
new_element.setAttribute("src", "modal.js");
document.body.appendChild(new_element);

const todos = [
  { title: "洗衣服", checked: false },
  { title: "買食物", checked: false },
];

function render() {
  const ul = document.getElementById("list"); //get ul
  const input = document.getElementById("input"); //get inputbox
  ul.textContent = "";

  for (const index in todos) {
    const todo = todos[index];
    const newItem = document.createElement("li");
    const deleteBtn = document.createElement("span");
    let checked = todo.checked;

    //測試用，如果原本就已經是確認處理過的是向不會再特地顯示
    // if (checked === true) {
    //   newItem.classList.add("checked");
    // }

    //判斷是否勾選item
    newItem.onclick = () => {
      newItem.classList.toggle("checked");
      checked = !checked;
      console.log(checked);
    };

    //判斷刪除按紐
    deleteBtn.onclick = () => {
      if (checked === true) {
        //利用splice刪除元素[index為當前位置, 1為刪除數量]
        todos.splice(index, 1);
        console.log(todos);
      } else {
        deleteToasts(index);
      }

      render();
    };

    ul.appendChild(newItem);
    newItem.classList.add("item");
    newItem.textContent = todo.title;
    newItem.appendChild(deleteBtn);
    deleteBtn.classList.add("delete");
  }
}

render();

//新增新的代辦事項
function add() {
  const input = document.getElementById("input"); //get inputbox
  const newInfo = {
    title: input.value,
    checked: false,
  };

  if (input.value != "") {
    todos.push(newInfo);
  } else {
    alert("請輸入內容");
  }
  render();
  input.value = "";
  console.log(todos);
}

// from的預設行為是提交之後會刷新頁面，所以用下面程式碼來預防它的預設行為
const form = document.getElementById("input-wrapper");
form.addEventListener("submit", (e) => {
  e.preventDefault(); //此方法可以取消該事件的預設行為
});

// //modal
// function deleteToasts(index) {
//   // 新增modal_background
//   const modalBackground = document.createElement("div");
//   modalBackground.classList.add("modalBackground");
//   document.body.append(modalBackground);
//   // 新增modal_container
//   const modalContainer = document.createElement("div");
//   modalContainer.classList.add("modalContainer");
//   modalBackground.append(modalContainer);
//   //modal_title
//   const modalTitle = document.createElement("h1");
//   modalTitle.textContent = "注意!!";
//   modalTitle.classList.add("modalTitle");
//   modalContainer.append(modalTitle);
//   //modal_content
//   const modalContent = document.createElement("p");
//   modalContent.textContent = "代辦事項還未完成確定要刪除嗎?";
//   modalContent.classList.add("modalContent");
//   modalContainer.appendChild(modalContent);
//   //modal confirm deny button
//   //cofirm button
//   const modalConfirmBtn = document.createElement("button");
//   modalConfirmBtn.classList.add("modalConfirmBtn");
//   modalConfirmBtn.textContent = "是";
//   modalContainer.appendChild(modalConfirmBtn);
//   modalConfirmBtn.onclick = () => {
//     todos.splice(index, 1);
//     modalBackground.style.display = "none";
//     render();
//   };

//   //deny button
//   const modalDenyBtn = document.createElement("button");
//   modalDenyBtn.classList.add("modalDenyBtn");
//   modalDenyBtn.textContent = "否";
//   modalContainer.appendChild(modalDenyBtn);
//   modalDenyBtn.onclick = () => {
//     modalBackground.style.display = "none";
//   };
// }
