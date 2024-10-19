const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',});

class Tasks {
  constructor(id, des) {
    this.taskId = id;
    this.des = des;
    this.complete = false;}

  toggleTS() {
    this.complete = !this.complete;}

  updateTD(newD) {
    this.des = newD;
}}

class operations {
  constructor() {
    this.toDoList = [];
    this.currentId = 1; }

  newT(des) {
    const newTask = new Tasks(this.currentId++, des);
    this.toDoList.push(newTask);
    console.log(`Task added: '${newTask.des}' (ID: ${newTask.taskId})`);}

  ls() {
    if (this.toDoList.length === 0) {
      console.log('No tasks.');
      return;}

    console.log('\nCurrent Tasks:');
    this.toDoList.forEach(task => {
      console.log(`ID: ${task.taskId} | Task: ${task.details} | Status: ${task.isDone ? 'Completed' : 'Pending'}`);
    });
    console.log('');
  }

  updateTS(taskId) {
    const task = this.toDoList.find(task => task.taskId === taskId);
    if (task) {
      task.changeStatus();
      console.log(`Task ID ${taskId} is now marked as ${task.isDone ? 'completed' : 'pending'}.`);
    } else {
      console.log(`Task with ID ${taskId} not found.`);
    }
  }

  removeT(taskId) {
    const index = this.toDoList.findIndex(task => task.taskId === taskId);
    if (index !== -1) {
      const removedTask = this.toDoList.splice(index, 1);
      console.log(`Task ID ${taskId} - '${removedTask[0].details}' was removed.`);
    } else {
      console.log(`Task with ID ${taskId} not found.`);
    }
  }

  updateT(taskId, newDetails) {
    const task = this.toDoList.find(task => task.taskId === taskId);
    if (task) {
      task.changeDetails(newDetails);
      console.log(`Task ID ${taskId} has been updated to '${task.details}'.`);
    } else {
      console.log(`Task with ID ${taskId} not found.`);
    }
  }

 
  findTask(searching) {
    const matchingTasks = this.toDoList.filter(task => task.details.toLowerCase().includes(searching.toLowerCase()));
    if (matchingTasks.length === 0) {
      console.log(`No tasks found matching '${searching}'.`);
    } else {
      console.log(`Tasks matching '${searching}':`);
      matchingTasks.forEach(task => {
        console.log(`ID: ${task.taskId} | Task: ${task.details} | Status: ${task.isDone ? 'Completed' : 'Pending'}`);
      });
    }
  }
}

const task_manager = new operations();


const showCommands = () => {
  console.log(`
CHOOSE:
1. Add: add (put here task description)
2. List all: list
3. Change status: status (put here task id)
4. Remove: remove (put here task id)
5. Update description: update (put here task id (put here new description)
6. Search: search (put here keyword)
7. Exit: exit
  `);
};


const processCommand = (input) => {
  const [command, ...args] = input.trim().split(' ');

  switch (command.toLowerCase()) {
    case 'add':
      if (args.length === 0) {
        console.log('Please put the task description.');
      } else {
        const details = args.join(' ');
        task_manager.newT(details);
      }
      break;

    case 'list':
      task_manager.ls();
      break;

    case 'status':
      const statusId = parseInt(args[0]);
      if (isNaN(statusId)) {
        console.log('Please put the correct task ID.');
      } else {
        task_manager.updateTS(statusId);      }
      break;

    case 'remove':
      const removeId = parseInt(args[0]);
      if (isNaN(removeId)) {
        console.log('Please put the correct task ID.');
      } else {
        task_manager.removeT(removeId);
      }
      break;

    case 'update':
      const updateId = parseInt(args[0]);
      if (isNaN(updateId) || args.length < 2) {
        console.log('Please put the correct task ID and the description.');
      } else {
        const newDes = args.slice(1).join(' ');
        task_manager.updateT(updateId, newDes); }
      break;

    case 'search':
      const searchT = args.join(' ');
      if (!searchT) {
        console.log('Please put the search keyword.');
      } else {
        task_manager.findTask(searchT);
      }
      break;

    case 'exit':
      rl.close();
      break;

    default:
      console.log('That is wrong, Please try again.');
      break;
  }
};


showCommands();
rl.prompt();

rl.on('line', (input) => {
  processCommand(input);
  rl.prompt();
}).on('close', () => {
  console.log('Thank you, Goodbye!!');
  process.exit(0);
});
