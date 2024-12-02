//modal
function deleteToasts(index) {
  // 新增modal_background
  const modalBackground = document.createElement("div");
  modalBackground.classList.add("modalBackground");
  document.body.append(modalBackground);
  // 新增modal_container
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modalContainer");
  modalBackground.append(modalContainer);
  //modal_title
  const modalTitle = document.createElement("h1");
  modalTitle.textContent = "注意!!";
  modalTitle.classList.add("modalTitle");
  modalContainer.append(modalTitle);
  //modal_content
  const modalContent = document.createElement("p");
  modalContent.textContent = "代辦事項還未完成確定要刪除嗎?";
  modalContent.classList.add("modalContent");
  modalContainer.appendChild(modalContent);
  //modal confirm deny button
  //cofirm button
  const modalConfirmBtn = document.createElement("button");
  modalConfirmBtn.classList.add("modalConfirmBtn");
  modalConfirmBtn.textContent = "是";
  modalContainer.appendChild(modalConfirmBtn);
  modalConfirmBtn.onclick = () => {
    todos.splice(index, 1);
    modalBackground.style.display = "none";
    render();
  };

  //deny button
  const modalDenyBtn = document.createElement("button");
  modalDenyBtn.classList.add("modalDenyBtn");
  modalDenyBtn.textContent = "否";
  modalContainer.appendChild(modalDenyBtn);
  modalDenyBtn.onclick = () => {
    modalBackground.style.display = "none";
  };
}
