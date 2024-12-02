
const savebtn = document.querySelector('#save-btn');
savebtn.onclick = SaveList;

function SaveList() {
    let list = document.querySelectorAll('#checkList li');
    let data = [];
    
    for (let item of list ) {
        let span = item.children[0].firstChild.textContent;         /*取得代辦事項內容*/
        let listPriority = item.className;                          /*代辦事項優先順序css*/
        let finishspan = item.children[0].lastChild.style.display;  /*取得已完成span display狀態*/
        let finishbtn = item.children[1].textContent;               /*取得標記已完成button 內容*/
        let iteminfo = {                /*將取得資料轉換成陣列型態*/
            span: span,
            listPriority: listPriority,
            finishspan: finishspan,
            finishbtn: finishbtn,
        }
        data.push(iteminfo);  /*將取得資料丟入data空陣列中*/
        // console.log(data);
    }

    /*新增資料物件 value轉成json格式資料*/
    localStorage.setItem('data', JSON.stringify(data));
    alert('儲存成功!!')    
}

if (localStorage.getItem('data')) {
    let data = JSON.parse(localStorage.getItem('data'));
    let list = document.querySelector('#checkList');
    let n = 0;

    if (data.length > 0 ){
        for (let li of data ){
            let li = document.createElement('li');
            let span = document.createElement('span');
            let finishspan = document.createElement('span');
            let finishbtn = document.createElement('button');
            let deletebtn = document.createElement('button');

            /*list 結構*/
            /*li*/
            list.append(li);
            li.className = data[n].listPriority;
            li.append(span);
            /*li>span*/
            span.textContent = data[n].span;
            span.className = 'spantext';
            span.append(finishspan);
            /*li>span>span*/
            finishspan.textContent = '(已完成)';
            finishspan.className = 'finishspan';
            // finishspan.style.display = 'block';
            finishspan.style.display = data[n].finishspan;

            /*li>button(標記完成)*/
            li.append(finishbtn);
            finishbtn.textContent = data[n].finishbtn;
            finishbtn.className = 'finishbtn'
            // finishbtn.onclick = checkfinish;

            /*li>button(刪除按鈕)*/
            li.append(deletebtn);
            deletebtn.textContent = 'x';
            deletebtn.className = 'btn';


            console.log(li);
            // li.append(span);
        }
    }
}