const terminalInput = document.getElementById("terminal_input");
const terminalEntriesBox = document.getElementById("terminal_entries_box");

/**
 * Object containing functions to generate messages for different commands.
 */
const getMessage = {
  /**
   * Generates a command message.
   * @param {string} command - The command entered by the user.
   * @returns {string} The formatted command message.
   */
  command: (command) => `> ${command}`,

  /**
   * Generates an unknown command message.
   * @param {string} command - The unknown command entered by the user.
   * @returns {string} The formatted unknown command message.
   */
  unknownCommand: (command) => `Unknown command: ${command}`,

  /**
   * Generates a help message listing available commands.
   * @returns {string} The help message.
   */
  help: () => `
    Available commands:
    - help: Display this help message
    - hello: Display a greeting message
    - reload: Reload the page
  `,

  /**
   * Generates a greeting message.
   * @returns {string} The greeting message.
   */
  hello: () => "Hello, visitor, my name is Mario and I'm a web developer",
};

/**
 * Handles the input from the terminal input box.
 * @param {KeyboardEvent} e - The keyboard event.
 */
function handleInput(e) {
  if (e.key === "Enter") {
    const command = terminalInput.value.trim();
    terminalInput.value = "";
    processCommand(command);
  }
}

/**
 * Processes the entered command and displays the appropriate message.
 * @param {string} command - The command entered by the user.
 */
function processCommand(command) {
  if (!command || typeof command !== "string") return;

  displayMessage(getMessage.command(command));

  switch (command.toLowerCase()) {
    case "help":
      displayMessage(getMessage.help());
      break;
    case "hello":
      displayMessage(getMessage.hello());
      break;
    case "reload":
      location.reload();
      break;
    default:
      displayMessage(getMessage.unknownCommand(command));
      break;
  }
}

/**
 * Displays a message in the terminal.
 * @param {string} message - The message to display.
 */
function displayMessage(message) {
  const entry = document.createElement("p");
  entry.className = "terminal_entry";
  entry.textContent = message;
  terminalEntriesBox.appendChild(entry);
}
