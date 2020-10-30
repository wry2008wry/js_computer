function init_code(){
	var html = "";
	for(var i = 0; i < tasks_code.length; i ++){
		var task_code = tasks_code[i];
		var table = "<table id=p-" + i + ">";
		for(var j = 0; j < task_code.length; j ++){
			var code = task_code[j];
			var tr = "<tr><td>" + code + "</td></tr>";
			table += tr;
		}
		table += "</table>";
		html += "<div>进程" + i + "</div>";
		html += table;
	}

	html += "<div>操作系统：</div>";
	html += "<table id='os_schedule'><tr><td>进程调度代码</td></tr></table>";
	$("#code_container").html(html);
}

function update_register(){
	var html = "";
	for(var i = 0; i < tasks_state.length; i ++){
		var state = tasks_state[i];
		if(i == current_task_id){
			state = register;
		}
		var table = "<table>";
		for(var register_name in state){
			var register_value = state[register_name];
			var tr = "<tr><td>" + register_name + "</td>" + "<td>" + register_value + "</td></tr>";
			table += tr;
		}
		table += "</table>";

		html += "<div>进程" + i + "</div>";
		html += table;
	}
	$("#state_container").html(html);


}

function update_current_code(){
	$("#code_container").find("tr").removeClass("current_execute");
	$("#p-" + current_task_id).find("tr").eq(register["IP"]).addClass("current_execute");
}

function set_os_schedule(){
	$("#code_container").find("tr").removeClass("current_execute");
	$("#os_schedule").find("tr").eq(0).addClass("current_execute");
}