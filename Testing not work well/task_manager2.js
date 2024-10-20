class Tasks {
  constructor(taskId, des) {
      this.taskId = taskId;
      this.des = des;
      this.complete = false;
  }

  toggleTS() {
      this.complete = !this.complete;
  }

  updateTD(newD) {
      this.des = newD;
  }
}

class operations {
  constructor() {
      this.toDoList = [];
      this.currentId = 1;
  }

  newT(des) {
      const newTask = new Tasks(this.currentId++, des);
      this.toDoList.push(newTask);
      console.log(`Task added: '${newTask.des}' (ID: ${newTask.taskId})`);
  }

  ls() {
      if (this.toDoList.length === 0) {
          console.log('No tasks available.');
          return;
      }

      console.log("Task List:");
      this.toDoList.forEach(task => {
          console.log(`ID: ${task.taskId} | Task: ${task.des} | Status: ${task.complete ? 'Completed' : 'Pending'}`);
      });
  }

  updateTS(taskId) {
      const task = this.toDoList.find(t => t.taskId === taskId);
      if (task) {
          task.toggleTS();
          console.log(`Task ID ${taskId} is now marked as ${task.complete ? 'completed' : 'pending'}.`);
      } else {
          console.log(`Task with ID ${taskId} not found.`);
      }
  }

  updateT(taskId, newDes) {
      const task = this.toDoList.find(t => t.taskId === taskId);
      if (task) {
          task.updateTD(newDes);
          console.log(`Task ID ${taskId} has been updated to '${task.des}'.`);
      } else {
          console.log(`Task with ID ${taskId} not found.`);
      }
  }

  removeT(taskId) {
      const index = this.toDoList.findIndex(t => t.taskId === taskId);
      if (index !== -1) {
          const removedTask = this.toDoList.splice(index, 1);
          console.log(`Task ID ${taskId} - '${removedTask[0].des}' was removed.`);
      } else {
          console.log(`Task with ID ${taskId} not found.`);
      }
  }

  findTask(searching) {
      const matchingTasks = this.toDoList.filter(task => task.des.toLowerCase().includes(searching.toLowerCase()));
      if (matchingTasks.length === 0) {
          console.log(`No tasks found matching '${searching}'.`);
      } else {
          console.log(`Tasks matching '${searching}':`);
          matchingTasks.forEach(task => {
              console.log(`ID: ${task.taskId} | Task: ${task.des} | Status: ${task.complete ? 'Completed' : 'Pending'}`);
          });
      }
  }
}

const task_manager = new operations();

function showMenu() {
  console.log(`
Task Manager Menu:
1. Add Task
2. View Tasks
3. Toggle Task Completion
4. Edit Task
5. Delete Task
6. Search Tasks
7. Exit
  `);

  let choice = prompt("Enter your choice (1-7):");
  return choice ? parseInt(choice, 10) : null;
}

function startTaskManager() {
  let running = true;

  while (running) {
      const choice = showMenu();

      switch (choice) {
          case 1: {
              const taskDescription = prompt("Enter the task description:");
              if (taskDescription) {
                  task_manager.newT(taskDescription);
              } else {
                  console.log("Task description cannot be empty.");
              }
              break;
          }

          case 2: {
              task_manager.ls();
              break;
          }

          case 3: {
              const taskId = parseInt(prompt("Enter the task ID to toggle completion:"), 10);
              if (!isNaN(taskId)) {
                  task_manager.updateTS(taskId);
              } else {
                  console.log("Invalid task ID.");
              }
              break;
          }

          case 4: {
              const taskId = parseInt(prompt("Enter the task ID to edit:"), 10);
              const newDescription = prompt("Enter the new task description:");
              if (!isNaN(taskId) && newDescription) {
                  task_manager.updateT(taskId, newDescription);
              } else {
                  console.log("Invalid task ID or description.");
              }
              break;
          }

          case 5: {
              const taskId = parseInt(prompt("Enter the task ID to delete:"), 10);
              if (!isNaN(taskId)) {
                  task_manager.removeT(taskId);
              } else {
                  console.log("Invalid task ID.");
              }
              break;
          }

          case 6: {
              const searching = prompt("Enter the keyword to search:");
              if (searching) {
                  task_manager.findTask(searching);
              } else {
                  console.log("Please enter a search keyword.");
              }
              break;
          }

          case 7: {
              console.log("Exiting Task Manager...");
              running = false;
              break;
          }

          default: {
              console.log("Invalid choice, please enter a number between 1 and 7.");
              break;
          }
      }
  }
}

// Start the Task Manager after a short delay to allow opening the console
setTimeout(() => {
  console.log("Welcome to the Task Manager. Open the console and follow the instructions.");
  startTaskManager();
}, 500);
