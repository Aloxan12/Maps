import {addTaskWorkerSaga, fetchTasksWorkerSaga} from "./tasks-sagas";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {call, put} from "redux-saga/effects";
import {GetTasksResponse, TaskPriorities, TaskStatuses, todolistsAPI} from "../../api/todolists-api";
import {setTasksAC} from "./tasks-reducer";

let todolistId = "todolistId";
beforeEach(()=>{
})

test('fetchTasksWorkerSaga success flow', () => {
    const gen = fetchTasksWorkerSaga({type:'', todolistId:todolistId})
    expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(gen.next().value).toEqual(call(todolistsAPI.getTasks, todolistId))
    const fakeApiResponse:GetTasksResponse ={
        error:'',
        totalCount: 1,
        items:[{
            id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },]
    }

    expect(gen.next(fakeApiResponse).value).toEqual(put(setTasksAC(fakeApiResponse.items, todolistId)))

    expect(gen.next().value).toEqual(put(setAppStatusAC('succeeded')))

})

test('addTaskWorkerSaga error flow', () => {
    const title = 'task title';
    const gen = addTaskWorkerSaga({type:'TASKS/ADD-TASKS',title:title, todolistId:todolistId})
    expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(gen.next().value).toEqual(call(todolistsAPI.createTask, todolistId, title))
    expect(gen.throw({message:'some error'}).value).toEqual(put(setAppErrorAC('some error')))
    expect(gen.next().value).toEqual(put(setAppStatusAC('failed')))
})

