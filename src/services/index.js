const BASE_URL = 'https://growapp.ifrs16.app';
const DATABASE_NAME = 'App';

// const BASE_URL = 'http://192.168.70.184:8069';
// const DATABASE_NAME = 'growpp_db_new1';

import AsyncStorage from '@react-native-async-storage/async-storage';


export const login = (username, password) => {
    console.log(`${BASE_URL}/web/session/authenticate/`)
    return fetch(`${BASE_URL}/web/session/authenticate/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            params: {
                login: username,
                password: password,
                db: DATABASE_NAME
            }
        }),
    }).then(res => res.json());
}



export const getAllTeam = () => {
    console.log(`${BASE_URL}/api/crm.team?query={id, name,  user_id{id, name, email, phone}, team_members_ids{id, name, email, phone}}`)
    return fetch(`${BASE_URL}/api/crm.team?query={id, name,  user_id{id, name, email, phone}, team_members_ids{id, name, email, phone}}`, {
        method: 'GET',
        headers: {
            // 'Accept': 'application/json, text/plain, /',
            // 'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //     jsonrpc: "2.0",
        //     params: {
        //         login: username,
        //         password: password,
        //         db: DATABASE_NAME
        //     }
        // }),
    }).then(res => res.json());
}

export const getNewTeam = () => {
    console.log(`${BASE_URL}/api/hr.employee?query={id, name, work_email, parent_id,  user_id{id, name}, child_all_count, department_id{id, name}, child_ids{id, name, work_email, user_id} }&filter=[["child_ids", "!=", false]]`)
    return fetch(`${BASE_URL}/api/hr.employee?query={id, name, work_email, parent_id,  user_id{id, name}, child_all_count, department_id{id, name}, child_ids{id, name, work_email, user_id} }&filter=[["child_ids", "!=", false]]`, {
        method: 'GET',
        headers: {
        },
    }).then(res => res.json());
}

export const getBlockTaskTeam = () => {
    console.log(`${BASE_URL}/api/hr.employee?get_all=1&query={id, name, work_email, parent_id, user_id{id, name}, department_id{id, name}}&filter=[["user_id", "!=", false],["user_id", "!=", 2]]`)
    return fetch(`${BASE_URL}/api/hr.employee?get_all=1&query={id, name, work_email, parent_id, user_id{id, name}, department_id{id, name}}&filter=[["user_id", "!=", false],["user_id", "!=", 2]]`, {
        method: 'GET',
        headers: {
        },
    }).then(res => res.json());
}



export const getTeamUserSelection = () => {
    console.log("Selection Team", `${BASE_URL}/api/hr.employee?query={id, name, work_email, parent_id, user_id{id, name}, department_id{id, name}}&filter=[["user_id", "!=", false],["user_id", "!=", 2]]`)
    return fetch(`${BASE_URL}/api/hr.employee?query={id, name, work_email, parent_id, user_id{id, name}, department_id{id, name}}&filter=[["user_id", "!=", false],["user_id", "!=", 2]]`, {
        method: 'GET',
        headers: {
        },
    }).then(res => res.json());
}


export const getAlJalilTeam = () => {
    console.log(`${BASE_URL}/api/hr.department?query={id, name, manager_id{id, name, work_email, child_all_count, child_ids{id, name, work_email, child_all_count, child_ids{id, name} } } }`)
    return fetch(`${BASE_URL}/api/hr.department?query={id, name, manager_id{id, name, work_email, child_all_count, child_ids{id, name, work_email, child_all_count, child_ids{id, name} } } }`, {
        method: 'GET',
        headers: {
        },
    }).then(res => res.json());
}



export const TaskCreate = (taskname, ids, description, date, status, priority, projectId) => {
    console.log(`${BASE_URL}/api/project.task`)
    console.log("ids array ", ids)
    return fetch(`${BASE_URL}/api/project.task`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            params: {
                data: {
                    name: taskname,
                    user_ids: [[6, 0, ids]],
                    active: true,
                    description: description,
                    message_ids: [[0, 0, { "subject": false, "model": "project.task", "grow_app_check": true, "body": description, "description": description, "message_type": "comment" }]],
                    date_deadline: date,
                    project_id: projectId,
                    kanban_state: status,
                    stage_id: status == "done" ? 3 : 1,
                    priority_kanban: priority
                }

            }
        }),
    }).then(res => res.json());
}
export const TaskCreateForSingleUser = (taskname, id, description, date, status, priority, projectId) => {
    console.log(`${BASE_URL}/api/project.task`)
    console.log("ids array ", id)
    console.log("ids array ", projectId)

    return fetch(`${BASE_URL}/api/project.task`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            params: {
                data: {
                    name: taskname,
                    user_ids: id,
                    active: true,
                    description: description,
                    message_ids: [[0, 0, { "subject": false, "model": "project.task", "grow_app_check": true, "body": description, "description": description, "message_type": "comment" }]],
                    date_deadline: date,
                    project_id: projectId,
                    kanban_state: status,
                    stage_id: status == "done" ? 3 : 1,
                    priority_kanban: priority
                }

            }
        }),
    }).then(res => res.json());
}

export const getAllTask = () => {
    console.log(`${BASE_URL}/api/project.task?query={id, name, user_ids{id, name}, description, priority, stage_id, tag_ids, create_date, kanban_state_label, kanban_state, date_end, date_assign, date_deadline, project_id, progress, overtime, create_uid, message_ids{id, body, description, date, grow_app_check }}&filter=[[ "kanban_state", "!=", "blocked"]]`)
    return fetch(`${BASE_URL}/api/project.task?query={id, name, user_ids{id, name}, description, priority, stage_id, tag_ids, create_date, kanban_state_label, kanban_state, date_end, date_assign, date_deadline, project_id, progress, overtime, create_uid, message_ids{id, body, description, date, grow_app_check }}&filter=[[ "kanban_state", "!=", "blocked"]]`, {
        method: 'GET',
        headers: {
            // 'Accept': 'application/json, text/plain, /',
            // 'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //     jsonrpc: "2.0",
        //     params: {
        //         login: username,
        //         password: password,
        //         db: DATABASE_NAME
        //     }
        // }),
    }).then(res => res.json());
}


export const singleComments = (taskId, description) => {
    console.log(`${BASE_URL}/api/project.task/${taskId}`)
    return fetch(`${BASE_URL}/api/project.task/${taskId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            params: {
                data: {
                    message_ids: { "subject": false, "model": "project.task", "grow_app_check": true, "body": description, "description": description, "message_type": "comment" }
                }

            }
        }),
    }).then(res => res.json());
}

export const deleteTask = (taskId) => {
    console.log(`${BASE_URL}/api/project.task/${taskId}`)
    return fetch(`${BASE_URL}/api/project.task/${taskId}`, {
        method: 'DELETE',
        headers: {
            // 'Accept': 'application/json, text/plain, /',
            // 'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //     jsonrpc: "2.0",
        //     params: {
        //         login: username,
        //         password: password,
        //         db: DATABASE_NAME
        //     }
        // }),
    }).then(res => res.json());
}



export const TaskUpdate = (taskname, ids, date, status, priority, taskId, project_id) => {
    console.log(`${BASE_URL}/api/project.task/${taskId}`)
    console.log("ids array ", ids)
    return fetch(`${BASE_URL}/api/project.task/${taskId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            params: {
                data: {
                    name: taskname,
                    user_ids: ids,
                    active: true,
                    stage_id: status == "done" ? 3 : 1,
                    // description:description,
                    // message_ids:[[0,0,{"subject": false,"model": "project.task","body": description,"description":description,"message_type":"comment"}]],
                    date_deadline: date,
                    kanban_state: status,
                    priority_kanban: priority,
                    project_id: project_id
                }

            }
        }),
    }).then(res => res.json());
}


export const Create_Priority = (name, id, description, rating, comment) => {
    console.log(`${BASE_URL}/api/project.project`)
    console.log("ids array ", id)
    return fetch(`${BASE_URL}/api/project.project`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            params: {
                data: {
                    name: name,
                    user_id: id,
                    active: true,
                    description: description,
                    priority_kanban: "" + rating,
                    message_ids: [[0, 0, { "subject": false, "model": "project.project", "grow_app_check": true, "body": comment, "description": comment, "message_type": "comment" }]],
                }

            }
        }),
    }).then(res => res.json());
}



export const getAllPriority = () => {
    console.log(`${BASE_URL}/api/project.project/?query={id, name, priority_kanban, user_id{id, name}, task_count,done_task_count, active, description, create_uid{id,name}, message_ids{id, body,  description, message_type}, task_ids{id, name,project_id, user_ids{name,id},create_uid{name},message_ids{id,body, description,date}, date_deadline,kanban_state} }`)
    return fetch(`${BASE_URL}/api/project.project/?query={id, name, priority_kanban, user_id{id, name}, task_count,done_task_count, active, description, create_uid{id,name}, message_ids{id, body,  description, message_type}, task_ids{id, name,project_id,user_ids{name,id},create_uid{name},message_ids{id,body, description,date}, date_deadline,kanban_state} }`, {
        method: 'GET',
        headers: {
            // 'Accept': 'application/json, text/plain, /',
            // 'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //     jsonrpc: "2.0",
        //     params: {
        //         login: username,
        //         password: password,
        //         db: DATABASE_NAME
        //     }
        // }),
    }).then(res => res.json());
}

export const GetTopPriorities = (month, year) => {
    console.log("month in api side", month)
    console.log("month in api side", year)

    console.log(`${BASE_URL}/object/monthly.note/get_monthly_priority`)
    return fetch(`${BASE_URL}/object/monthly.note/get_monthly_priority`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            params: {
                args: [],
                kwargs: {
                    year: year,
                    month: month
                }

            }
        }),
    }).then(res => res.json());
}


export const UpdateTopPriority = (note, status, id) => {
    console.log("note in api side", note)
    console.log("status in api side", status)

    console.log(`${BASE_URL}/api/monthly.note/${id}`)
    return fetch(`${BASE_URL}/api/monthly.note/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            params: {
                data: {
                    note: note,
                    completed: status
                }

            }
        }),
    }).then(res => res.json());
}



export const BlockTaskCreateForSingleUser = (taskname, id, description) => {
    console.log(`${BASE_URL}/api/project.task`)
    console.log("ids array ", id)
    // console.log("ids array ", projectId )

    return fetch(`${BASE_URL}/api/project.task`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            params: {
                data: {
                    name: taskname,
                    user_ids: id,
                    active: true,
                    description: description,
                    message_ids: [[0, 0, { "subject": false, "model": "project.task", "grow_app_check": true, "body": description, "description": description, "message_type": "comment" }]],
                    // date_deadline:date,
                    project_id: false,
                    kanban_state: "blocked",
                    stage_id: 1,
                    priority_kanban: "0"
                }
            }
        }),
    }).then(res => res.json());
}


export const getAllBlockTask = () => {
    console.log(`${BASE_URL}/api/project.task?query={id, name, user_ids{name,id}, description, priority, stage_id, tag_ids, create_date, kanban_state_label,kanban_state,priority_kanban, date_end, date_assign, date_deadline,message_ids{id,body, description,date}, project_id, progress, overtime, create_uid{name} }&filter=[["kanban_state", "=", "blocked"]]`)
    return fetch(`${BASE_URL}/api/project.task?query={id, name, user_ids{name,id}, description, priority, stage_id, tag_ids, create_date, kanban_state_label,kanban_state,priority_kanban, date_end, date_assign, date_deadline,message_ids{id,body, description,date}, project_id, progress, overtime, create_uid{name} }&filter=[["kanban_state", "=", "blocked"]]`, {
        method: 'GET',
        headers: {
            // 'Accept': 'application/json, text/plain, /',
            // 'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //     jsonrpc: "2.0",
        //     params: {
        //         login: username,
        //         password: password,
        //         db: DATABASE_NAME
        //     }
        // }),
    }).then(res => res.json());
}

export const getAllHuddles = (date) => {
    console.log(typeof date)
    console.log(`${BASE_URL}/api/grow.huddles/?query={id, user_id{id, name}, date, projects_description, description, today_task_ids{id, name}, yesterday_task_ids{id, name}, block_tasks_ids{id, name}  }&filter=[["date", "=","${date}"]]`)
    return fetch(`${BASE_URL}/api/grow.huddles/?query={id, user_id{id, name}, date, projects_description, description, today_task_ids{id, name}, yesterday_task_ids{id, name}, block_tasks_ids{id, name}  }&filter=[["date", "=", "${date}"]]`, {
        method: 'GET',
        headers: {
            // 'Accept': 'application/json, text/plain, /',
            // 'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //     jsonrpc: "2.0",
        //     params: {
        //         login: username,
        //         password: password,
        //         db: DATABASE_NAME
        //     }
        // }),
    }).then(res => res.json());
}

export const UpdateHuddlesTask = (huddleId, taskid, date, userId,) => {
    console.log(typeof date)
    console.log("huddles id ", huddleId)
    console.log("Task id", taskid)
    console.log("current date", date)
    console.log("user id", userId)
    console.log(`${BASE_URL}/api/grow.huddles`)
    return fetch(`${BASE_URL}/api/grow.huddles`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            params: {
                data: {
                    date: date,
                    user_id: userId,
                    today_task_ids: [taskid],
                    main_huddles_ids: [huddleId]
                }
            }
        }),
    }).then(res => res.json());
}



export const UpdateYesterdayTask = (huddleId, taskid, date, userId,) => {
    console.log(typeof date)
    console.log("huddles id ", huddleId)
    console.log("Task id", taskid)
    console.log("current date", date)
    console.log("user id", userId)
    console.log(`${BASE_URL}/api/grow.huddles`)
    return fetch(`${BASE_URL}/api/grow.huddles`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            params: {
                data: {
                    date: date,
                    user_id: userId,
                    yesterday_task_ids: [taskid],
                    main_huddles_ids: [huddleId]
                }
            }
        }),
    }).then(res => res.json());
}



export const CreateMainHuddles = (name, ids) => {
    console.log(typeof name)
    console.log(name)
    console.log(ids)

    console.log(`${BASE_URL}/api/project.huddles/`)
    return fetch(`${BASE_URL}/api/project.huddles/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            params: {
                data: {
                    name: name,
                    huddle_attendees: ids
                }
            }
        }),
    }).then(res => res.json());
}

export const CreateWeeklyMainHuddles = (name, ids) => {
    console.log(typeof name)
    console.log(name)
    console.log(ids)

    console.log(`${BASE_URL}/api/project.weekly.huddles/`)
    return fetch(`${BASE_URL}/api/project.weekly.huddles/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",

            params: {
                data: {
                    name: name,
                    huddle_attendees: ids
                }
            }
        }),
    }).then(res => res.json());
}

export const getAllDailyMainHuddles = (date) => {
    console.log(typeof date)
    console.log(`${BASE_URL}/api/project.huddles/?query={id, name, huddle_attendees{id, name, email}, date, grow_huddles_ids{id, date, create_date, user_id{name}, description, today_tasks, today_completed, yesterday_tasks, yesterday_completed }, create_uid{id, name}}`)
    return fetch(`${BASE_URL}/api/project.huddles/?query={id, name, huddle_attendees{id, name, email}, date, grow_huddles_ids{id, date, create_date, user_id{name}, description, today_tasks, today_completed, yesterday_tasks, yesterday_completed }, create_uid{id, name}}`, {
        method: 'GET',
        headers: {
            // 'Accept': 'application/json, text/plain, /',
            // 'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //     jsonrpc: "2.0",
        //     params: {
        //         login: username,
        //         password: password,
        //         db: DATABASE_NAME
        //     }
        // }),
    }).then(res => res.json());
}

export const getAllWeeklyMainHuddles = (date) => {
    console.log(typeof date)
    console.log(`${BASE_URL}/api/project.weekly.huddles/?query={id, name, huddle_attendees{id, name, email},  create_uid{id, name}, weekly_huddles_ids{id, create_date, user_id{name}, info_for_team, high_low, help_required }}`)
    return fetch(`${BASE_URL}/api/project.weekly.huddles/?query={id, name, huddle_attendees{id, name, email},  create_uid{id, name}, weekly_huddles_ids{id, create_date, user_id{name}, info_for_team, high_low, help_required }}`, {
        method: 'GET',
        headers: {
            // 'Accept': 'application/json, text/plain, /',
            // 'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //     jsonrpc: "2.0",
        //     params: {
        //         login: username,
        //         password: password,
        //         db: DATABASE_NAME
        //     }
        // }),
    }).then(res => res.json());
}



export const CreateDailySubHuddles = (userId, dateToday, description, todayTasks, todayCompleted, huddleId) => {
    console.log(`${BASE_URL}/api/grow.huddles`)
    return fetch(`${BASE_URL}/api/grow.huddles`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            params: {
                data: {
                    user_id: userId,
                    date: dateToday,
                    description: description,
                    today_tasks: todayTasks,
                    today_completed: todayCompleted,
                    main_huddles_ids: [huddleId]
                }
            }
        }),
    }).then(res => res.json());
}

export const CreateWeeklySubHuddles = (userId, infoTeam, businessHighLow, helpRequired, dateToday, huddleId) => {
    console.log(`${BASE_URL}/api/grow.weekly.huddles`)
    return fetch(`${BASE_URL}/api/grow.weekly.huddles`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc: "2.0",
            params: {
                data: {
                    user_id: userId,
                    info_for_team: infoTeam,
                    high_low: businessHighLow,
                    help_required: helpRequired,
                    date: dateToday,
                    main_weekly_huddles_ids: [[6, false, [huddleId]]]
                }
            }
        }),
    }).then(res => res.json());
}

export const updateYesterdayStatus = (id, yesterdayComplete) => {
    console.log("Huddle id is : ", id)
    
    console.log(`${BASE_URL}/api/grow.huddles/${id}`)
    return fetch(`${BASE_URL}/api/grow.huddles/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, /',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jsonrpc:"2.0",
            params:{
               data:{
                 yesterday_completed : yesterdayComplete
               }
            }
         }),
    }).then(res => res.json());
}





export const storeCredential = async (username, password, uid, admin) => {
    try {
        await AsyncStorage.setItem('username', username.toString())
        await AsyncStorage.setItem('password', password)
        await AsyncStorage.setItem('uid', uid.toString())
        await AsyncStorage.setItem('admin', admin.toString())
    } catch (e) {
        console.log("error", e)
        // saving error
    }
}
