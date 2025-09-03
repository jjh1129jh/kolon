/** 탑메뉴 배열 **/
var menuTopArr = new Array(0, 1, 5, 9, 100);

var indexIsPlay = false;

/** 서브메뉴 배열 **/
var subArry = new Array(0,   1,2,4,5,6,7,8,9,10,11,   100);

var subIdx;

/** 메뉴 세팅 **/
function setIndex(){
	/**	index 전체 box 	**/
	var indexStr = '';

	indexStr += '<div class="index_inner"> ';

	indexStr += ' <div class="index_0"> ';
	indexStr += '		<h3>INDEX</h3>';
	indexStr += ' </div> ';

	indexStr += ' <div class="index_1"> ';
	indexStr += '		<p>시작하기</p>';
	indexStr += '		<ul> ';
	indexStr += '			<li id="sub01"><span>시작하기</span></li> ';
	indexStr += '			<li id="sub02"><span>인트로</span></li> ';
	indexStr += '			<li id="sub03"><span>학습목표</span></li> ';	
	indexStr += '		</ul> ';
	indexStr += ' </div> ';
	
	indexStr += ' <div class="index_2"> ';
	indexStr += '		<p>준법경영의 필요성</p>';
	indexStr += '		<ul> ';
	indexStr += '			<li id="sub04"><span>협력사와의 관계를 중심으로 1</span></li> ';	
	indexStr += '			<li id="sub05"><span>협력사와의 관계를 중심으로 2</span></li> ';	
	indexStr += '		</ul> ';
	indexStr += ' </div> ';

	indexStr += ' <div class="index_3"> ';
	indexStr += '		<p>누구나 쉽게 배우는 공정거래법</p>';
	indexStr += '		<ul> ';
	indexStr += '			<li id="sub06"><span>불공정거래행위 일반</span></li> ';	
	indexStr += '			<li id="sub07"><span>거래상 지위남용의 주요 내용과 사례 1</span></li> ';
	indexStr += '			<li id="sub08"><span>거래상 지위남용의 주요 내용과 사례 2</span></li> ';
	indexStr += '			<li id="sub09"><span>거래상 지위남용의 주요 내용과 사례 3</span></li> ';
	indexStr += '		</ul> ';
	indexStr += ' </div> ';
	
	indexStr += ' <div class="index_4"> ';
	indexStr += '		<p>마무리하기</p>';
	indexStr += '		<ul> ';
	indexStr += '			<li id="sub10"><span>핵심정리</span></li> ';
	indexStr += '			<li id="sub11"><span>드래곤을 잡아라!</span></li> ';
	indexStr += '			<li id="sub12"><span>아웃트로</span></li> ';
	indexStr += '		</ul> ';
	indexStr += ' </div> ';

	indexStr += '</div> ';


	$("#fs-index").append(indexStr)

	// $("#fs-index").mouseover(function(){
	// 	$(this).css("opacity", "1");
	// })
	// $("#fs-index").mouseout(function(){
	// 	$(this).css("opacity", "0");
	// })
	setMenuPage();
}

/** 메뉴 세팅(활성화) **/
function setMenuPage(){
	
	var page = curPage;
	subIdx = curPage;
	/** 탑메뉴 활성화 **/
	for(var i=0; i<menuTopArr.length; i++){
		if(page >= menuTopArr[i] && page < menuTopArr[i+1]){
			idxMenu = i; 

		}else{
			$("#page"+i).css("cursor","pointer");
			$("#page"+i).on("mouseover", {goPage:menuTopArr[i]}, handleMenuOver);
			$("#page"+i).on("mouseout", {goPage:menuTopArr[i]}, handleMenuOut);
			$("#page"+i).on("click", {goPage:menuTopArr[i]}, handleMenuClick);
		}
	}
	//서브메뉴
	for(var i =0 ;i < pageArray.length ; i++){
		
		$("#sub"+ itostr(i) ).css({"color":"#aaa", "cursor":"pointer"});
		$("#sub"+ itostr(i) ).on("mouseover",  handleSubMenuOver);
		$("#sub"+ itostr(i) ).on("mouseout",  handleSubMenuOut);
		$("#sub"+ itostr(i) ).on("click",  handleSubMenuClick);
	}
	for(var i = 0; i < subArry.length; i++){
		if(	curPage > subArry[i] && curPage < subArry[i+1] ){
				
			subIdx = (subArry[i] + 1);

		}
	}

	$("#sub"+ itostr(subIdx) ).css({"color":"#ff8b00", "cursor":"default"});
	$("#sub"+ itostr(subIdx) ).off("mouseover");
	$("#sub"+ itostr(subIdx) ).off("mouseout");
	$("#sub"+ itostr(subIdx) ).off("click");
	

}
//서브 메뉴 오버
function handleSubMenuOver(){
	$(this).css({"color":"#ff8b00"});
}
//서브 메뉴 아웃
function handleSubMenuOut(){
	$(this).css({"color":"#aaa"});
}
//서브 메뉴 클릭
function handleSubMenuClick(){
	console.log($(this).attr("id"))
	var subIdx = $(this).attr("id");
	subIdx = subIdx.substr(subIdx.length-2,2);
	console.log(subIdx);
	_targetUrl = itostr(curChasi)+'_'+ subIdx +'.html';
	//alert("subIdx : "+Number(subIdx)+" / "+curPage)	
//	location = _targetUrl;
	if(Number(subIdx) > curPage){
		if(!isLocal){
			if(progressControll == "N"){
				alert("학습 완료 후 이동 가능합니다.");
				return;
			}
		}					
	}
	//alert("_targetUrl : "+_targetUrl)	
	NextMove(_targetUrl)

}
/** 메뉴 오버 **/
function handleMenuOver(evt){
	//msg("over : " + evt.data.goPage);
	$(this).css({"color":"#ff8b00"});	

}

/** 메뉴 아웃 **/
function handleMenuOut(evt){
	$(this).css({"color":"#666"});	
}

/** 메뉴 클릭 **/
function handleMenuClick(evt){
	_targetUrl=itostr(curChasi)+'_'+itostr(evt.data.goPage)+'.html';
//	location= _targetUrl;
	NextMove(_targetUrl)	
}

/**	index 버튼 열려라 클릭	**/
function handleOpenIndex(){
		$("#fs-index").stop().animate({"left":0});


}

/**	index 버튼 닫아라 클릭	**/
function handleHideIndex(){
		$("#fs-index").stop().animate({"left":"-400px"});
}