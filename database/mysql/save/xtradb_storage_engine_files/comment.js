// wp-content/themes/yuewei File
//short for document.getElementById
function $() {
	if (arguments.length == 1) return get$(arguments[0]);
	var elements = [];
	$c(arguments).each(function(el){
		elements.push(get$(el));
	});
	return elements;
}
function get$(el){
	if (typeof el == 'string') el = document.getElementById(el);
	return el;
}

function $c(array){
	var nArray = [];
	for (i=0;el=array[i];i++) nArray.push(el);
	return nArray;
}

// get parameters of the comment form
function getParams(f){
	if(typeof(f)=='string')	f = $(f);
	var p='';
	var fi = f.getElementsByTagName('input');
	for (i=0; i<fi.length; i++ ) {
		e=fi[i];
		if (e.name!='') {
			if (e.type=='select')
				element_value=e.options[e.selectedIndex].value;
			else if (e.type=='checkbox' || e.type=='radio') {
				if (e.checked==false)	continue;	
				element_value=e.value;
			}
			else {
				element_value=e.value;
			}
			p+="&"+e.name+'='+encodeURIComponent(element_value);
		}
	}
	fi = f.getElementsByTagName('textarea');
	for (i=0; i<fi.length; i++)	p+="&"+fi[i].name+"="+encodeURIComponent(fi[i].value);
	p += "&random="+Math.random();
	return p;
}

// move comment form to proper position to reply exist comments.
function moveForm(a) {
	var id		= $('comment_reply_ID'),
		disp	= $('reRoot').style,
		form	= $('commentform'),
		e		= $('comment-'+a);
	var es = $('commentform').getElementsByTagName('*');
	
	form.parentNode.removeChild(form);
	if (a) {
		var c = e.getElementsByTagName('ul')[0];
		if (c)
			e.insertBefore(form, c);
		else
			e.appendChild(form);
	} else {
		$('cmtForm').appendChild(form);
	}
	disp.display = (a ? 'inline' : 'none');
	if (id) id.value = (a ? a : 0);
	if (a && $('author')) {$('author').focus();}
	return;
}

//the function to get an ajax instance
function getXMLInstant(r)
{
	var xx;
	if(r!=1)ajaxStatus("block");
	if (window.XMLHttpRequest) 
	{ // Mozilla, Safari,...
		xx = new XMLHttpRequest();
	} 
	else if (window.ActiveXObject) { // IE
		try {
			xx = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xx = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	if (!xx) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	
	return xx;
}
//the function to send comment
function AjaxSendComment()
{
   var gi = getXMLInstant(1), r = $('comment_reply_ID').value, t, c, now = parseInt(Math.random()*1000);
	
	if (r == 0) {
		t = 'comments';
		c = $(t);
	} else {
		t = 'comment-'+r;
		var u = $(t).getElementsByTagName('ul')[0];
		if (u) {
			c = u;
		} else {
			c = document.createElement('ul');
			$(t).appendChild(c);
		}
	}
	// backup comment in case of Comment fail
	var content = $("comment").value;
	var author = "admin", email="a@b.c";
	var temp = content;
	if($("author"))author = $("author").value;
	if($("email"))email = $("email").value;
	//check the author and content input area is fixed
	if(content == "" || ( (needemail=="1") && (author == "" || email == ""))){
		if(author ==""){ alert("name is necessary"); if($("authorrequire"))$("authorrequire").style.color="red";$("author").focus();}
		else if(email==""){ alert("email is necessary");; if($("emailrequire"))$("emailrequire").style.color="red";$("email").focus();}
	    else{ alert("comment can not be empty");$("comment").focus();}
	   	return true;
	}
	
	//add comment to local comment list
	content = content.replace(/\r\n\r\n/g, "</p><p>");
	content = content.replace(/\r\n/g, "<br />");
	content = content.replace(/\n\n/g, "</p><p>");
	content = content.replace(/\n/g, "<br />");
	var dateObj = new Date();
	c.innerHTML = c.innerHTML + "<li id='newComment"+now+"'><div class=\"commenthead newcomment\">At "+dateObj.toLocaleString()+", <span class=\"author\">"+ author+ "</span> said: </div><div class=\"body\"><p>"  + content+ "</p></div><div class='meta' id='submitcomment'>You submit a new comment...</div></div></li>";
	
	//the state function of ajax 
	gi.onreadystatechange = function()
    {
        if (gi.readyState == 4) {
            if (gi.status == 200) {
               $('newComment'+now).innerHTML=gi.responseText;
					// ajaxStatus("none");
					if(gi.responseText.search(/Slow down cowboy/) > -1 || gi.responseText.search(/Duplicate comment detected/) > -1)
						$('comment').value = temp;
            } else {
				$('comment').value = temp;
				$('submitcomment').innerHTML = 'Submit failed, you submit too fast or submit a duplicate comment...';
				alert('Failed to add your comment. ');
            }
        }
    }
	
	//send form by ajax
	var p=getParams("commentform"); // get parameters of form
	gi.open('POST', blogurl+"/wp-content/plugins/ajaxcomment/comments-ajax.php", true);
   gi.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   gi.setRequestHeader("Content-length", p.length);
   gi.setRequestHeader("Connection", "close");
   gi.send(p);
    
	//after send form, move the comment form to original position.
   comment_preview(false);
   moveForm(0);

   $('comment').value = '';
   
   return true;
}

function ajaxPost(u, p, e, s, m){
	var g = getXMLInstant();
    	
	if ($(e))	e = $(e); 
	
	g.onreadystatechange = function(){
		if (g.readyState == 4) {
      		if (g.status == 200) {
				if (typeof(m) != "undefined" && m == "delete") { if (e) e.parentNode.removeChild(e); }
         		else { if (e) e.innerHTML = g.responseText; }
				if (s) 	eval(s);
				ajaxStatus("none");
			} else {
         		alert('There was a problem with the request.');
         	}
		}
	}
    
	g.open('POST', u, true);
   	g.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   	g.setRequestHeader("Content-length", p.length);
   	g.setRequestHeader("Connection", "close");
   	g.send(p);
	
}

// Get content by AJAX, u:url; e:element; j:jump; s:alert message; m: method

function ajaxShowPost(u, e, j, s, m){
	if ("undefined"!=typeof(nowurl) && u==nowurl) {
		window.location.href="#"+j;
		return;
	}
	if ( u.match(/getpost/) )	nowurl=u;
	var g = getXMLInstant();
    	
	if ($(e))	e = $(e); 
	
	g.onreadystatechange = function(){
		if (g.readyState == 4) {
      		if (g.status == 200) {
				if (typeof(m) != "undefined" && m == "delete") { if (e) e.parentNode.removeChild(e); }
         		else { if (e) e.innerHTML = g.responseText; }
				if (j)	window.location.href = "#"+j;
				if (s) 	eval(s);
				ajaxStatus("none");
			} else {
         		alert('There was a problem with the request.');
         	}
		}
	}
    
   g.open('GET', u, true);
   g.send(null);
}

// toggle #ajax status
function ajaxStatus(s) {
	if (!$("ajax")) return;
	$("ajax").style.display = s;
}

function comment_preview(i) {
	if (typeof(i)=='undefined' && $('copreview').style.display != 'block' || typeof(i) != 'undefined' && i == true) {
		if ($('copreview').style.display != 'block') {
			var p=getParams("commentform");
			ajaxPost(blogurl + '/wp-content/plugins/ajaxcomment/preview.php', p, 'copreview', "$('commentdiv').style.display = 'none';$('copreview').style.display = 'block';$('prectr').value = 'Edit';");
		}
	} else {
		if ($('copreview').style.display != 'none') {
			$('prectr').value = 'Preview';
			$('commentdiv').style.display = 'block';
			$('copreview').style.display = 'none';
			$('comment').focus();
		}
	}
}