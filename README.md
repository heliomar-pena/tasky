# Tasky - Simple Task Manager App

Basic task manager app made with React Native.

## Table of Content

- [Tasky - Simple Task Manager App](#tasky---simple-task-manager-app)
  - [Table of Content](#table-of-content)
  - [Features](#features)
  - [How to run the App](#how-to-run-the-app)
    - [Pre-requisites](#pre-requisites)
    - [How to run it](#how-to-run-it)
  - [Technologies used](#technologies-used)
  - [Decisions Taken](#decisions-taken)
  - [Areas to improve](#areas-to-improve)

## Features

- Create a task with description.
- Mark a task as completed, incompleted or delete it.
- Filter tasks by task status.
- Tasks are ordered based on creation time.
- Completed tasks are moved at end of the list, keeping important tasks at the top of the list.
- Feedback to user interactions with animations.
- Feedback to user with toast notifications.
- Optimistic updates with Undo button for delete actions.
- Edit a task to add more details, like a description.
- Delete task to keep focus on the important tasks.

## How to run the App

### Pre-requisites

1. Node 24.13.0
2. Expo GO installed on Android or iOs device (for App Preview)

### How to run it

1. Clone the repo

   ```sh
   git clone https://github.com/heliomar-pena/tasky.git
   # Or with SSH
   git clone git@github.com:heliomar-pena/tasky.git
   ```

2. Install the dependencies

   ```sh
   npm install
   ```

3. Start the application

   ```sh
   npm run start
   ```

4. Open the app:
   1. In the browser: go to [localhost:8081](localhost:8081)
   2. In mobile: Scan the QR code with Expo to Go

## Technologies used

| Techonlogy    | Description                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Expo          | Framework built at the top of React Native making better the development experience.                                            |
| React Native  | Framework that allows creating multi-platform applications using React as syntax.                                               |
| Reanimated    | An animation's library for react native. Used for creating reactive interactions giving feedback to user's via animations       |
| Sonner Native | A port to React Native for the sonner library. Used for giving feedback to user via toast notifications and optimistic updates. |

## Decisions Taken

- Tasks are sorted by creation date, and completed tasks are moved to the end of the list. this is made to keep the tasks that are interesting for our users at the top of the list, preventing the user from scrolling when there are too many tasks. However, this can be very confuse for the user when the change happens instantly, so added a transition during the position change of the elements to help the user to understand what happened.
- Tasks are created only with the title, then user can edit to add more details. This is made this way to allow the user to create tasks quickly, then focus on add details if needed. This improves the user experience as the user does not needs a different screen to create a task, it can create multiple tasks quickly from the same screen, then fill the details if needed.
- Added filters by status. These filters allows the user to focus only on the pending tasks more than on all the tasks.
- Hiden Delete button to avoid user clicking it by error. This way also the UI looks cleaner as it does not have unnecesary buttons on the screen: If the user needs a delete button, can swipe the task to the right to make it appear, then click delete. Yet if a user clicks the delete button by error, can Undo the change by clicking Undo button on the toast notification.

## Areas to improve

- Animations could be smoother and cleaner.
- Could be added a transition on the Create Task input when the button appears.
- Maybe a searchbar, category or filters by date would be useful to avoid having a lot of tasks on only one page.
- The "Tip" menu could be displayed by using Toast notification, that would be better as it would avoid the notifications to hide it.
- It could be added unit and integration testing.
