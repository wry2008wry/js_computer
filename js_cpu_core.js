var register = {"IP": 0, "A": 0};
var current_task_id = 0;
var need_interrupt = false;
var tasks_state = [{"IP":0, "A":0}, {"IP":0, "A":0}];

var tasks_code = [[
		"MOV A,0",
	    "ADD A,1",
		"JMP 1",
	],[
		"MOV A,100",
		"SUB A,4",
		"JMP 1"
	]
];

function trigger_interrupt(){
    need_interrupt = true;
}

function do_interrupt() {
	set_os_schedule();

	//保存当前任务的状态
	var saved_state = tasks_state[current_task_id];
	saved_state["IP"] = register["IP"];
	saved_state["A"] = register["A"];

	//随机挑选一个任务
    current_task_id = Math.round(Math.random());
	
	//恢复下一个任务的状态
	var restored = tasks_state[current_task_id];
	register["IP"] = restored["IP"];
	register["A"] = restored["A"];
}

function execute(code){
    [op,p] = code.split(" ");
	[p1,p2] = p.split(",");
	p2 = parseInt(p2);

	update_register();
	update_current_code();

	switch(op){
		case "MOV":
		    register[p1] = p2;break;
		case "ADD":
			register[p1] += p2;break;
		case "SUB":
			register[p1] -= p2;break;
		case "JMP":
			register["IP"] = p1;break;
	}

	if(op != "JMP"){
		register["IP"] ++;
	}
}

function clock() {
    if(need_interrupt){
        do_interrupt();
        need_interrupt=false;
    }else{
        var IP = register["IP"];
        var code = tasks_code[current_task_id][IP];
        execute(code);
    }
}

var clock_timer;
var interrupt_timer;

function start(){
	clock_timer = setInterval(clock, 500);
	interrupt_timer = setInterval(trigger_interrupt, 2000);
}