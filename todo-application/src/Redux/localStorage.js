export const loadData = (key) => {
    try {
        let data = localStorage.getItem(key);
        return JSON.parse(data);
    } catch (error) {
        return undefined;
    }
};

export const saveData = (key, data) => {
    data = JSON.stringify(data);
    localStorage.setItem(key, data);
};

export const removeData = (key) => {
   
    localStorage.removeItem(key);
};

export const removeTask = (payload) => {
    try {
        let pending = localStorage.getItem('pending');
        pending = JSON.parse(pending)
        pending = pending.filter((item) => item.id !== payload)
        pending = JSON.stringify(pending)
        localStorage.setItem('pending', pending)

        let completedTodo = localStorage.getItem('completed');
        completedTodo = JSON.parse(completedTodo)
        completedTodo = completedTodo.filter((item) => item.id !== payload)
        completedTodo = JSON.stringify(completedTodo)
        localStorage.setItem('completed', completedTodo)
        
    } catch (error) {
        return undefined;
    }
}
