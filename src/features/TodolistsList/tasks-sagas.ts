//sagas
import {AxiosResponse} from "axios";
import {GetTasksResponse, ResponseType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {call, put,select, takeEvery} from "redux-saga/effects";
import {setAppStatusAC} from "../../app/app-reducer";
import {addTaskAC, removeTaskAC, setTasksAC, UpdateDomainTaskModelType, updateTaskAC} from "./tasks-reducer";
import {handleServerAppErrorSaga, handleServerNetworkErrorSaga} from "../../utils/error-utils";
import {AppRootStateType} from "../../app/store";

export function* fetchTasksWorkerSaga(action: ReturnType<typeof fetchTasks>) {
    yield put(setAppStatusAC('loading'))
    const data: GetTasksResponse = yield call(todolistsAPI.getTasks, action.todolistId)
    const tasks = data.items
    yield put(setTasksAC(tasks, action.todolistId))
    yield put(setAppStatusAC('succeeded'))
}

export function* removeTaskWorkerSaga(action: ReturnType<typeof removeTask>) {
    const res: AxiosResponse<ResponseType> = yield call(todolistsAPI.deleteTask, action.todolistId, action.taskId)
    yield put(removeTaskAC(action.taskId, action.todolistId))
}
export function* addTaskWorkerSaga (action: ReturnType<typeof addTask>){
    yield put(setAppStatusAC('loading'))
    try {
        const res = yield call (todolistsAPI.createTask, action.todolistId, action.title)
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            const action = addTaskAC(task)
            yield put(action)
            yield put(setAppStatusAC('succeeded'))
        } else {
            yield* handleServerAppErrorSaga(res.data);
        }
    } catch(error) {
        yield* handleServerNetworkErrorSaga(error)
    }
}
export function* updateTaskWorkerSaga(action: ReturnType<typeof updateTask>) {
    //return (getState: ()=>AppRootStateType)=>{
    const state: AppRootStateType = yield select(state => state)
    const task = state.tasks[action.todolistId].find(t => t.id === action.taskId)
    if (!task) {
        //throw new Error("task not found in the state");
        console.warn('task not found in the state')
        return
    }
    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...action.domainModel
    }
    try {
        const res = yield call(todolistsAPI.updateTask, action.todolistId, action.taskId, apiModel)
        if (res.data.resultCode === 0) {
            yield put(updateTaskAC(action.taskId, action.domainModel, action.todolistId))
        } else {
            yield handleServerAppErrorSaga(res.data);
        }
    } catch (error) {
        yield handleServerNetworkErrorSaga(error);
    }
}

export const fetchTasks = (todolistId: string) => ({type: 'TASKS/FETCH-TASKS', todolistId})
export const removeTask = (taskId: string, todolistId: string) => ({type: 'TASKS/REMOVE-TASKS', taskId, todolistId})
export const addTask = (title: string, todolistId: string) => ({type: 'TASKS/ADD-TASKS', todolistId, title}as const)
export const updateTask = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => ({
    type: 'TASKS/UPDATE-TASKS',
    taskId,
    domainModel,
    todolistId,
})


export function* tasksWatcherSaga(){
    yield takeEvery("TASKS/FETCH-TASKS", fetchTasksWorkerSaga)
    yield takeEvery('TASKS/REMOVE-TASKS', removeTaskWorkerSaga)
    yield takeEvery('TASKS/ADD-TASKS', addTaskWorkerSaga)
    yield takeEvery('TASKS/UPDATE-TASKS', updateTaskWorkerSaga)
}