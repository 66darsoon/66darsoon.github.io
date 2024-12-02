

function add() {

    let todolist = document.querySelector("#todolist"); /*input*/
    let list = document.querySelector('#checkList');    /*ul*/
    let select = document.querySelector('#select');     /*select*/
    
    let newlist = document.createElement('li');         /*生成li元素*/
    let span = document.createElement('span');          /*生成span元素*/
    let finishspan = document.createElement('span');
    let deleter = document.createElement('button');     /*生成button元素*/
    let finishbtn = document.createElement('button');   /*生成標記已完成按鈕*/

    // console.log(todolist.value);

    if (todolist.value === ''){
        alert('請輸入代辦事項')
    }else {

        if (select.value === 'important') {
            // newlist.style['background-color'] = 'rgb(255, 141, 47)';
            newlist.className = 'important-list';       /*list重要事項css*/
            // console.log(newlist.className);
        }else if (select.value === 'urgent') {
            // newlist.style['background-color'] = 'rgb(255, 59, 59)';
            newlist.className = 'urgent-list';       /*list緊急事項css*/
        }else if (select.value === 'normal') {
            newlist.className = 'normal-list';       /*list一般事項css*/
        }

        // console.log(select.value);

        finishbtn.textContent = '[標記已完成]'; /*標記已完成按鈕文字*/
        finishbtn.className = 'finishbtn';      /*標記已完成按鈕*/
        deleter.textContent = 'X';              /*刪除按鈕文字*/
        finishspan.textContent = '(已完成)';    /*已完成span文字*/
        finishspan.className = 'finishspan';    /*確認已完成span css*/
        finishspan.style.display = 'none';      /*已完成span 預設display為none*/
        deleter.className = 'btn';              /*刪除按鈕css*/
        span.className = 'spantext';            /*輸入的代辦事項css*/
        span.textContent = todolist.value;      /*將輸入的值丟到span的文字*/
        todolist.value = '';                    /*將input內容刪除*/
        list.append(newlist);                   /*ul內新增li*/

        
        /*li內新增span button*/
        newlist.append(span);
        span.append(finishspan);
        newlist.append(finishbtn);         
        newlist.append(deleter);

        todolist.className = 'normal';      /*將input css 還原預設值*/
        
        // console.log(newlist.children) /*確認li裡面包含的元素*/
        // console.log(newlist.children[0]) /*確認選取哪一個元素(目前是span)*/
        finishbtn.onclick = checkfinish;
        deleter.onclick = remove; /*當list內部button被啟動後移除該list*/
    }

}     


function remove() {
    // Event.target.parentELement.remove();
    event.target.parentElement.remove();
}

function checkfinish(){
    let target = event.target;

    if (target.textContent === '[標記已完成]' ) {
        target.textContent = '[標記未完成]';
        target.parentElement.children[0].children[0].style.display = 'block';
        // console.log(target.closet('li'));
    }else if (target.textContent === '[標記未完成]') {
        target.textContent = '[標記已完成]';
        target.parentElement.children[0].children[0].style.display = 'none';
    }
    // alert(event.target.textContent)
}


function postText(){
    let list = document.querySelector('#checkList').children;  /*取得ul內部li資訊*/
    // console.log(list.className);
    // console.log(newlist);
    let result = '';
    let num = 1;

    if(list.length == 0){
        alert('目前無代辦事項，請新增')
    }else {
        for (let i of list) {
            // console.log(i.className);
            if (i.className === 'important-list') {         /*importmant*/
                result += ' ' + num + '. *' + i.children[0].firstChild.textContent + '* ';
                // result += ` ${num}.${i.children[0].textContent}`;
            }else if (i.className === 'urgent-list') {  /*urgent*/
                result += ' ' + num + '. **' + i.children[0].firstChild.textContent + '** ';
            }else if (i.className === 'normal-list') {  /*normal*/
                result += ' ' + num + '.' + i.children[0].firstChild.textContent;
                // result += ' ' + num + '.' + i.querySelector('.spantext').textContent;
                // console.log(i.children[0].firstChild.textContent);
                // result += ` ${num}.${i.children[0].textContent}`;
            }
            num++
        }
        alert('目前代辦事項' + result );
    };    
}


function show() {
    let inputlist = document.querySelector('#todolist');
    let select = document.querySelector('#select');
    let selectIndex = select.selectedIndex;
    let selectValue = select.options[selectIndex].value;

    if (selectValue === 'important' ) {
        // alert(inputlist.className)
        inputlist.className = 'important';   
    }else if (selectValue === 'urgent') {
        inputlist.className = 'urgent'
    }else if (selectValue === 'normal') {
        inputlist.className = 'normal';
        // console.log(inputlist.className);
    }
        // console.log(selectValue);
}




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
    let data = JSON.parse(localStorage.getItem('data')); /*將取得的json格式資料轉成物件*/
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
            finishspan.style.display = data[n].finishspan;

            /*li>button(標記完成)*/
            li.append(finishbtn);
            finishbtn.textContent = data[n].finishbtn;
            finishbtn.className = 'finishbtn'
            finishbtn.onclick = checkfinish;

            /*li>button(刪除按鈕)*/
            li.append(deletebtn);
            deletebtn.textContent = 'x';
            deletebtn.className = 'btn';
            deletebtn.onclick = remove;


            console.log(li);
            // li.append(span);
        }
    }
}




