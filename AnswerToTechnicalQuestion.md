# TECHNICAL QUESTION
**Q1 -   How long did you spend on the coding test?** 

***Time Management:***
1. UI-Design : 30 min
2. UI-Coding: 2hrs
3. Functionality:3hrs
****

**Q2 -   What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.** 

In various projects, I've incorporated several advanced features like useCallback, useMemo, useLayoutEffect, and useDeferredValue. However, one key hook that's been fundamental across these projects is useEffect. It's  used for managing side effects in functional components, enabling actions to be performed after the initial rendering and after subsequent updates. 
Let me illustrate with an example of how useEffect plays a crucial role:
```
useEffect(() => {
    if (!isOpen) {
      setEditId(null);
    }
    const filteredList = tasksFromStorage.filter((task) => {
      const isInSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()) ||
        task.date.toLowerCase().includes(search.toLowerCase());

      const isPriorityMatch = priority ? task.priority === priority : true;

      switch (tab) {
        case "All":
          return isInSearch && isPriorityMatch;
        case "Upcoming":
          return moment(task.date).isAfter(new Date())&& isInSearch && isPriorityMatch;
        case "Overdue":
          return moment(task.date).isBefore(new Date()) && isInSearch && isPriorityMatch;
        case "Completed":
          return task.status === "Completed" && isInSearch && isPriorityMatch;
        default:
          return isInSearch && isPriorityMatch;
      }
    });
    setList(filteredList);
  }, [isOpen, search, priority, tab]);
  ```

**Q3 -   How would you track down a performance issue in production? Have you ever had to do this?** 

When faced with a production performance issue, a structured approach becomes essential. Firstly, it's crucial to carefully identify the specific area causing the problem by using tools that track and locate performance concerns.

Next, a thorough examination of the relevant code is conducted to uncover operations consuming excessive resources or inefficient algorithms.

Following this, necessary improvements are made. This involves making adjustments aimed at reducing unnecessary processes, optimizing how data is stored and accessed, and refining the code's efficiency.

However, before implementing these changes into the live environment, it's vital to test them in a controlled setting. This ensures that the alterations are effective and won't cause any unforeseen issues when deployed.

By following this methodical process, we can ensure a systematic and effective resolution to production performance challenges.



**Q4 -If you had more time, what additional features or improvements would you consider adding to the task management application?** 

Certainly! If I had more time to enhance a task management application, here are some features and improvements I'd consider:

1.  **User Authentication (Login/Signup):** Implementing a secure login/signup system would allow users to have personalized accounts. This way, each user can have their own space to store and manage their tasks privately.
    
2.  **Date and Time-Based Filtering:** Adding advanced filtering options based on dates and times. Users could sort and view tasks based on deadlines, due dates, or scheduled times, providing a more organized and time-sensitive approach to managing their tasks.
    
3.  **Priority Levels and Labels:** Providing the ability to assign priority levels or labels (e.g., high, medium, low) to tasks can help users prioritize their workload more effectively.
4.  **Notifications:** Offering users the flexibility to customize their task views and receive customizable notifications (e.g., reminders, alerts for approaching deadlines) can enhance user experience and keep them on track with their tasks.   

These additions aim to make the task management application more comprehensive, user-centric, and adaptable to different work styles and preferences.
****
