
	$(document).ready(function(){
		//go get the 'about' page
		myXHR('get',{'path':'/about/'}).done(function(json){
			//console.log(json);
			var x='<h2>'+json.title+'</h2>';
			x+='<p>'+json.description+'</p>';
			x+='<p>"'+json.quote+'"</p>';
			x+='<p>'+json.quoteAuthor+'</p>';
			$('#content1q').html(x);
		});
		//$( "#tabs" ).tabs();
		
		//get the undergraduate info...
		myXHR('get',{'path':'/degrees/undergraduate/'}).done(function(json){
			//console.log(json);
			//I have an object holding arrays...
			var x='';
			$.each(json.undergraduate,function(i,item){
				var tabElem = document.getElementById('undergrad');
				$('<Label>').append(document.createTextNode("Title: "+item.title)).appendTo($('#undergrad'));
				$('<br>').appendTo('#undergrad');
				$('<Label>').append(document.createTextNode("Description: "+item.description)).appendTo($('#undergrad'));
				$('<br>').appendTo('#undergrad');
				$('#undergrad').append('<br>');
			});
			//$('#content').html(x);
		});
		
		//people... (just faculty)
		
		myXHR('get',{'path':'/degrees/graduate/'}).done(function(json){

			var x='';
			$.each(json.graduate,function(i,item){
				if(i<3) {
				$('<Label>').append(document.createTextNode("Title: "+item.title)).appendTo($('#grad'));
				$('<br>').appendTo('#grad');
				$('<Label>').append(document.createTextNode("Description: "+item.description)).appendTo($('#grad'));
				$('<br>').appendTo('#grad');
				$('<br>').appendTo('#grad');
				}

			});
			//$('#content1').html(x);
			
		});
		$("#card").flip();
		$('#card').balloon({ position: "bottom right"});

		myXHR('get',{'path':'/people/faculty/'}).done(function(json){
			var x='';
			var facultyListCt = document.getElementById('facultyList');
			$.each(json.faculty,function(){
				var facdiv = $('<div></div').addClass("facultyListElem").appendTo(facultyListCt);
				var fac = $('<a></a>').attr('title',$(this)[0].name).appendTo(facdiv);
				var facimg = $('<img></img>').attr({"src":$(this)[0].imagePath,"padding":"10","margin":"10","height":"70","width":"70","id":$(this)[0].username,"onclick":'facMore(this.id)'}).appendTo(fac);
		
			});

		});

		 $('#facultydetails a').balloon({ position: "bottom right"});

		
		myXHR('get',{'path':'/research/'}).done(function(json){
			console.log(json);
			var x='';
			var facultyResListCt = document.getElementById('facultyResList');

			$.each(json.byInterestArea,function(i,item){ 
				console.log(item);
				var facdiv = $('<div></div>').addClass('facultyResListElem').attr({"id":item.areaName,"onclick":'resMore(this.id)'}).appendTo(facultyResListCt);
				$('<p></p>').text(item.areaName).appendTo(facdiv);		
			});

		});

		 $('#facultydetails a').balloon({ position: "bottom right"});
		 $('.facultyResListElem').balloon({ position: "bottom right"});
				
		//$('.facultyList').tile();
		//minors
		/*myXHR('get',{'path':'/minors/'}).done(function(json){
			var x='';
			$.each(json.UgMinors,function(i,item){
				//console.log(item.description);
				x+="<h2>"+item.name+"</h2>";
				x+="<p>"+item.title+"</p>";
				x+="<p>"+item.description+"</p>";
				
			});
			$('#content4').html(x);
		});*/
		
		/*myXHR('get',{'path':'/news/'}).done(function(json){
			var x='';
			$.each(json.year,function(i,item){
				//console.log(item.description);
				x+="<h2>"+item.date+"</h2>";
				x+="<p>"+item.title+"</p>";
				
			});
			$('#content5').html(x);
		});*/
		
		//get map http://ist.rit.edu/api/map/
		myXHR('get',{'path':'/employment/'}).done(function(json){
			$('#employmentDesc').append(document.createTextNode(json.introduction.content[0].description));
			$('#coopDesc').append(document.createTextNode(json.introduction.content[1].description));
			$("#empStats1").append('<br/>');
			$("#empStats1").append(document.createTextNode(json.degreeStatistics.statistics[1].value));
			$("#empStats1").append('<br/>');
			$("#empStats1").append(document.createTextNode(json.degreeStatistics.statistics[1].description));
			$("#empStats1").append('<br/>');
				
			$("#empStats2").append('<br/>');
			$("#empStats2").append(document.createTextNode(json.degreeStatistics.statistics[2].value));
			$("#empStats2").append('<br/>');
			$("#empStats2").append(document.createTextNode(json.degreeStatistics.statistics[2].description));
			$("#empStats2").append('<br/>');
				
			$("#empStats3").append('<br/>');
			$("#empStats3").append(document.createTextNode(json.degreeStatistics.statistics[0].value));
			$("#empStats3").append('<br/>');
			$("#empStats3").append(document.createTextNode(json.degreeStatistics.statistics[0].description));
			$("#empStats3").append('<br/>');
				

			
		});	

		/*myXHR('get',{'path':'/courses/'}).done(function(json){
			var x='';
			$.each(json.courses,function(i,item){
				//console.log(item.description);
				x+="<h6>"+item+"</h6>";
				
			});
			$('#content7').html(x);
		});*/

		/*$('.banner').unslider({
        	speed: 500,               //  The speed to animate each slide (in milliseconds)
        	delay: 3000,              //  The delay between slide animations (in milliseconds)
        	complete: function() {},  //  A function that gets called after every slide animation
        	keys: true,               //  Enable keyboard (left, right) arrow shortcuts
        	dots: true,               //  Display dot navigation
        	fluid: false              //  Support responsive design. May break non-responsive designs
		});	*/
		
		var $container = $('.facultyList');            
   			//$container.imagesLoaded(function(){                    
      	$container.masonry({
         	itemSelector: '.facultyListElem',
         	isAnimated: true,
         	columnWidth: 150
     	});
		
     	var $container = $('.facultyResList');            
   			//$container.imagesLoaded(function(){                    
      	$container.masonry({
         	itemSelector: '.facultyListElem',
         	isAnimated: true,
         	columnWidth: 150
     	});

      	$('#empListp').balloon({ position: "bottom right"});

		$.stellar({
    		horizontalScrolling: false,
    		responsive: true
		});
		
	});
	
	function loadEmployeeList() {

        var mytable = $('<table></table>').attr({ id: "basicTable" });

        var rows = new Number("20");
        var cols = new Number("4");
        var tr = [];
        var empdia = document.getElementById('empListdetails');
        $('#empListdetails').html(" ");
        myXHR('get',{'path':'/employment/'}).done(function(json){
			var x='';
			//console.log(json.introduction.content[0].description);
			var thead = $('<thead></thead>').appendTo(mytable);
			var trow =  $('<tr></tr>').appendTo(thead);
			$('<td></td>').text("Employer").appendTo(trow);
			$('<td></td>').text("Degree").appendTo(trow);
			$('<td></td>').text("City").appendTo(trow);
	
			var tbody =  $('<tbody></tbody>').appendTo(mytable);
			
			$.each(json.coopTable.coopInformation,function(i,item){
				//console.log(item.description);
				var row = $('<tr></tr>').appendTo(tbody);
				$('<td></td>').text(item.employer).appendTo(row);
				$('<td></td>').text(item.degree).appendTo(row);
				$('<td></td>').text(item.city).appendTo(row);
			});
			//$('#content5').html(x);
			mytable.appendTo(empdia);
    		
		});	
		$('#empListdetails').dialog({
    		title:"Employer List",
    		modal:true,
		 	closeOnEscape: true,
		 	height:500,
		 	width:800,
		 	resizable:false,
		 	dialogClass:'dialogBoxEmp'
    	});
    	$('#basicTable').DataTable({
    		bJQueryUI: true
    	});

	}
	

	function animateBox(obj) {
		//$('#stats1').animate({boxShadow: '20 20 30px Red'});
		var options = {};
		var elem = obj.id;
		$(obj).effect( 'highlight', options, 1000, callback );
	}
	function callback() {
      setTimeout(function() {
        $( "#effect" ).removeAttr( "style" ).hide().fadeIn();
      }, 1500 );
    };
	

	function facMore(id){
		
		$('#facultydetails').html(" ");
		myXHR('get',{'path':'/people/faculty/username='+id}).done(function(json){
			$('#facultydetails').append($('<Label>').append(document.createTextNode("Name:: "+json.name)));
			$('#facultydetails').append('<br>');

			$('#facultydetails').append($('<Label>').append(document.createTextNode("Title:: "+json.title)));
			$('#facultydetails').append('<br>');

			$('#facultydetails').append($('<Label>').append(document.createTextNode("Interest:: "+json.interestArea)));
			$('#facultydetails').append('<br>');

			$('#facultydetails').append($('<Label>').append(document.createTextNode("Phone:: "+json.phone)));
			$('#facultydetails').append('<br>');


			$('#facultydetails').append($('<Label>').append(document.createTextNode("Email:: "+json.email)));
			$('#facultydetails').append('<br>');

		});
		 $("#dialog").dialog({
		 	title:"Faculty",
		 	modal:true,
		 	closeOnEscape: true,
		 	height:300,
		 	width:400,
		 	resizable:false,
		 	dialogClass:'dialogBox'

		 });
		
	}

	function resMore(id) {
		$('#facultyResdetails').html(" ");
		console.log(id);
		id=jQuery.trim(id);
		id = id.replace(/\s+/g, '%20');
		myXHR('get',{'path':'/research/byInterestArea/areaName='+id}).done(function(json){
			$('#facultyResdetails').append($('<Label>').append(document.createTextNode("Area Name:: "+json.areaName)));
			$('#facultyResdetails').append('<br>');

			$('#facultyResdetails').append($('<Label>').append(document.createTextNode("Citations:: "+json.citations)));
			$('#facultyResdetails').append('<br>');
		});
		 $("#dialogRes").dialog({
		 	title:"Research By Interest",
		 	modal:true,
		 	closeOnEscape: true,
		 	height:500,
		 	width:700,
		 	resizable:false,
		 	dialogClass:'dialogBox'

		 });

	}

	function loadContactForm() {
		$('#contactForm').toggle();
	}
	
	////////////////Ajax Util///////////////////
	// in: (t,d) 
	//		t="get" or "post"
	//		d={"path":"/undergrad/"}
	// return: ajax object ready to consume the callback
	////////////////////////////////////
	function myXHR(t,d){
		return $.ajax({
			type:t,
			cache:false,
			async:true,
			dataType:'json',
			url:'proxy.php',
			data:d,
			beforeSend:function(){
				//happen before send...
			}
		}).always(function(){
			//happen no matter what
		}).fail(function(){
			//handle failure...
		});
	}
