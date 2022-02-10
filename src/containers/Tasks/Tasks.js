import React, {useEffect} from 'react';
import './Tasks.scss'
import arrowIcon from "../../assets/images/bx-chevron-down-big.svg";
import TasksFilters from "../../components/Tasks/TasksFilters";
import TaskCreationModal from "../../components/TasksModals/TaskCreationModal";
import TasksList from "../../components/Tasks/TasksList";
import axios from "axios";
import {useDispatch} from "react-redux";
import { setTasks} from "../../features/tasksSlice";
import {useSelector} from "react-redux";
import {selectTasks} from "../../features/tasksSlice";
import {selectActiveTag, setTags} from "../../features/tagsSlice";
import {selectActiveCategory} from "../../features/categoriesSlice";
import {selectSearch, selectSort} from "../../features/filtersSlice";
import {useMediaQuery} from "react-responsive";
import plusIcon from '../../assets/images/bx-plus.svg'
import plusBlueIcon from '../../assets/images/bx-plus--blue.svg'

const priorities = ['Important', 'Middle', 'Neutral', 'Low'];

function Tasks() {

    const dispatch = useDispatch();

    const tasks = useSelector(selectTasks)

    const activeCategory = useSelector(selectActiveCategory)
    const activeTag = useSelector(selectActiveTag)
    const searchString = useSelector(selectSearch)
    const sortOption = useSelector(selectSort)

    const [tasksList, setTasksList] = React.useState(tasks)
    const handleTaskList = (tasks) => setTasksList(tasks)

    useEffect(() => {
        handleTaskList(getFilteredTasks);
    }, [tasks])

    useEffect(() => {
        handleTaskList(getFilteredTasks)
    }, [activeCategory, activeTag, searchString])

    useEffect(() => {
        handleTaskList(getSortedTasks(tasksList))
    }, [sortOption])


    const getSortedTasks = (tasksArray) => {
        const arrayForSort = [...tasksArray];
        switch (sortOption) {
            case null:
                return arrayForSort;
            case 'Sort by name':
               return arrayForSort.sort((a, b) => {
                    return (a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0);
                })
            case 'Sort by date':
                return arrayForSort.sort((a, b) => {
                    return (a.createdAt < b.createdAt) ? 1 : ((a.createdAt > b.createdAt) ? -1 : 0);
                })
            case 'Sort by priority':
               return arrayForSort.sort((a, b) => {
                    return (priorities.indexOf(a.priority) < priorities.indexOf(b.priority)) ? -1 : (priorities.indexOf(a.priority) > priorities.indexOf(b.priority) ? 1 : 0);
                })
            default:
                return arrayForSort;
        }
    }


    const getFilteredTasks = () => {
        const filteredTasks = tasks.filter(task => {
            return (
                (activeCategory === 'All' || task.categoryId == activeCategory) && (activeTag === 'All' || task.tags !== null && task.tags.split(' ').includes(activeTag)) && (searchString === '' || task.name.toLowerCase().includes(searchString.toLowerCase()))
            );
        })
        //Tasks array should be sorted after by active option after each category or another filter change
        return getSortedTasks(filteredTasks);
    }


    const [open, setOpen] = React.useState(false);
    const handleToggle = () => setOpen(!open)


    //Setting all unique tags from all tasks in redux state
    useEffect(() => {
        if (tasks.length !== 0) {
            const tags = [];
            tasks.forEach(task => {
                if (task.tags !== null) {
                    if (tags.length === 0) {
                        tags.push(...task.tags.split(' '))
                    } else {
                        tags.push(...task.tags.split(' ').filter(tag => {
                            return !tags.includes(tag)
                        }))
                    }
                }
            })
            dispatch(setTags(tags))
        }
    }, [tasks])


    useEffect(() => {
        const token = localStorage.getItem('authorization');
        getTasksFromApi(token)
            .then(response => {
                dispatch(setTasks(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const getTasksFromApi = (token) => {
        return axios({
            method: "get",
            url: "http://34.125.5.252:3000/api/tasks",
            headers: {'authorization': 'Bearer ' + token}
        })
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            })
        }


    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const arrowDownClassName = "groups__arrow-icon groups__arrow-icon--down"
    const arrowUpClassName = "groups__arrow-icon groups__arrow-icon--up"

    const isTablet = useMediaQuery({query: '(max-width: 1270px)'})
    const isMobile = useMediaQuery({query: '(max-width: 768px)'})

    useEffect(() => {
        if (isTablet) {
            setOpen(true)
        }
    }, [isTablet])

    return (
        <div className="tasks">
            <div className="tasks__header">
                {
                    !isTablet &&
                    <>
                        <h3 className="tasks__title" onClick={handleToggle}>My tasks</h3>
                        <img src={arrowIcon} alt="arrow" className={open ? arrowUpClassName : arrowDownClassName} onClick={handleToggle}/>
                    </>
                }
                {
                    open &&
                    <>
                        <TasksFilters/>
                        {
                            !isTablet &&
                            <button
                                className="button button--primary tasks__add-button"
                                    onClick={handleModalOpen}
                            >
                                Create task
                                <img src={plusIcon} alt="plus"/>
                            </button>
                        }
                    </>
                }
            </div>
            {
                tasks.length !== 0 && open &&
                <TasksList tasks={tasksList}/>
            }
            {
                isTablet &&
                <button
                    className="button button--secondary tasks__add-button"
                    onClick={handleModalOpen}
                >
                    New task
                    <img src={plusBlueIcon} alt="plus"/>
                </button>
            }
            <TaskCreationModal open={modalOpen} handleClose={handleModalClose} isCreation={true}/>
        </div>
    );
}

export default Tasks;