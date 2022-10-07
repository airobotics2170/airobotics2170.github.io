let line_num = 0;
let line_num_statment = "cmd";
let result_num_statment = "result";

let json = require('test.json');
alert(json, 'the json obj');

var file = "";
let type = "";
var files = [];
var dirs = [];
var trash = [];
let label_num_statment = "cmd_label";
let jquery_lns = "#"+line_num_statment;
var current_path = "";
var cmd;
var logged_in = false;
var username;
var password;
var user_login = false;

function fullscreen()
{
    var
          el = document.documentElement
        , rfs =
               el.requestFullScreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
    ;
    rfs.call(el);
}

function change_visibility() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
      document.getElementById("visibility_text").innerText="🔓";
    } else {
      x.type = "password";
      document.getElementById("visibility_text").innerText="🔐";
    }
}

function disableScroll() {
    scrollTop = 
      window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = 
      window.pageXOffset || document.documentElement.scrollLeft,

        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

window.onload = function()
{
    window.scrollTo(0, 0);
    disableScroll();
}

function enableScroll() {
    window.onscroll = function() {};
}

$("#password").keyup(function(event) {
    if (event.keyCode === 13) {
        username = document.getElementById("username").value;
        password = document.getElementById("password").value;
        if(password.length <= 4)
        {
            document.getElementById("password_error").innerHTML="Password must be at least 5 charatcers long";
            password = document.getElementById("password").value="";
        }
        else
        {
            document.getElementById(label_num_statment).innerHTML='<span id="cloud">'+username+'@Cloud-Term</span> ~ > ';
            logged_in = true;
            document.getElementById("username").remove();
            document.getElementById("login_overlay").remove();
            $('#username_label').remove();
            $('#password').remove();
            $('#password_label').remove();
            enableScroll();
        }
    }
});

function disableScroll() {
    scrollTop = 
      window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = 
      window.pageXOffset || document.documentElement.scrollLeft,

        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

window.onload = function()
{
    window.scrollTo(0, 0);
    disableScroll();
}

function enableScroll() {
    window.onscroll = function() {};
}

function getParameter(parameterName)
{
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName);
}

var background_color = getParameter("background-color");
var color = getParameter("color");
var theme = getParameter("theme");

function check()
{
    cmd = document.getElementById(line_num_statment).value;
    if(cmd.includes("echo"))
    {
        var echo_split = cmd.split(" ");
        document.getElementById(result_num_statment).innerHTML=echo_split[1];
    }
    else if(cmd.includes("cf"))
    {
        var filename = cmd.split(" ");
        files.push(filename[1]);
        document.getElementById(result_num_statment).innerHTML="Created new file "+filename[1];
    }
    else if(cmd.includes("mkdir"))
    {
        var dirname = cmd.split(" ");
        dirs.push(dirname[1]);
        document.getElementById(result_num_statment).innerHTML="Created new directory "+dirname[1];
    }
    else if(cmd.includes("find"))
    {
        var find = cmd.split(" ");
        if(find[2] === "--dir")
        {
            index = dirs.includes(find[1]);
            type = "dir";
        }
        else if(find[2] === "--file")
        {
            index = files.includes(find[1]);
            type = "file";
        }
        if(index === true)
        {
            document.getElementById(result_num_statment).innerHTML=find[1];
        }
        else
        {
            document.getElementById(result_num_statment).innerHTML="Found no "+type+" called "+find[1];
        }
    }
    else if(cmd.includes("trash"))
    {
        var trash_file = cmd.split(" ")[1];
        if(confirm("Are you sure you want to delete "+cmd.split(" ")[2]+" "+trash_file+"?") == true)
        {
            if(cmd.split(" ")[2] === "--dir")
            {
                trash.push(trash_file+" --dir");
                dirs.pop(trash.indexOf(trash_file));
            }
            else if(cmd.split(" ")[2] === "--file")
            {
                trash.push(trash_file+" --file");
                files.pop(trash_file);
            }
            document.getElementById(result_num_statment).innerHTML="Succesfully put "+trash_file+" into the trash.";
        }
        else
        {
            document.getElementById(result_num_statment).innerHTML="Operation cancelled.";
        }
    }
    else if(cmd.includes("restore"))
    {
        restore_file = cmd.split(" ");
        alert(restore_file[2]);
        if(trash.includes(restore_file[1]+" "+restore_file[2]))
        {
            if(cmd.split(" ")[2] === "--dir")
            {
                dirs.push(cmd.split(" ")[1]);
                trash.pop(trash.indexOf(cmd.split(" ")[1]+cmd.split(" ")[2]))
                document.getElementById(result_num_statment).innerHTML="Succefully restored directory "+cmd.split(" ")[1]+".";
            }
            else if(cmd.split(" ")[2] === "--file")
            {
                files.push(cmd.split(" ")[1]);
                trash.pop(trash.indexOf(cmd.split(" ")[1]+cmd.split(" ")[2]))
                document.getElementById(result_num_statment).innerHTML="Succefully restored file "+cmd.split(" ")[1]+".";
            }
        }
    }
    
    else
    {
        switch(cmd)
        {
            case "clear":
                window.location.reload();
            break;

            case "ff":
                document.getElementById(result_num_statment).innenText="Directories: "+dirs+"\nFiles: "+files;
            break;
            
            case "exit":
                alert("Saved session succefully");
                window.location.close();
            break;

            case "help":
                document.getElementById(result_num_statment).innerText="mkdir - Creates new directory\ncf - Creates new file\necho - Prints out text\n";
            break;

            case "empty":
                trash.length = 0;
                document.getElementById(result_num_statment).innerHTML="Deleted all files successfully.";
            break;

            default:
                document.getElementById(result_num_statment).innerHTML="Command "+"'"+cmd+"'"+" not found";
        }
    }
}

document.addEventListener("keydown", function(event) {
    if (event.which == 13 && logged_in === true) {
        check();
        let original_label = document.getElementById("cmd_label");
        let clone_label = original_label.cloneNode(true);
        label_num_statment = 'label_number_'+line_num;
        clone_label.id = label_num_statment;
        document.body.appendChild(clone_label);
        line_num_statment = 'cmd';
        let original_cmd = document.getElementById(line_num_statment);
        let clone_cmd = original_cmd.cloneNode(true);
        line_num_statment = 'line_number_'+line_num;
        clone_cmd.id = line_num_statment;
        document.body.appendChild(clone_cmd);
        console.log(document.getElementById("result").textContent);
        document.getElementById(line_num_statment).value="";
        let original_break = document.getElementById("line_break");
        document.getElementById("line_break").className="";
        let clone_break = original_break.cloneNode(true);
        if(document.getElementById("result").textContent === null || document.getElementById("result").textContent !== "")
        {
            document.getElementById("line_break").className="ignore";
        }
        let break_num_statment = 'break_number_'+line_num;
        clone_break.id = break_num_statment;
        document.body.appendChild(clone_break);
        let original_result = document.getElementById(result_num_statment);
        let clone_result = original_result.cloneNode(true);
        result_num_statment = 'result_number_'+line_num;
        clone_result.id = result_num_statment;
        document.body.appendChild(clone_result);
        document.getElementById(result_num_statment).innerHTML="";
        line_num++;
        let ttt = line_num-2
        let line_num_statment1
        line_num_statment1 = 'line_number_'+ttt;
        document.getElementById(line_num_statment1).disabled=true;
        console.log(line_num_statment);
        document.getElementById(line_num_statment).focus();
    }
  });

function checkFocus()
{
    var cmd100 = document.getElementById(line_num_statment);
    if(cmd100 !== document.activeElement && logged_in === true)
    {
        document.getElementById(line_num_statment).focus();
    }
}

setInterval("checkFocus();",1)