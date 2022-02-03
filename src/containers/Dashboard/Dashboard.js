import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {setCategories} from "../../features/categoriesSlice";
import {useSelector} from "react-redux";
import {selectCategories} from "../../features/categoriesSlice";
import {selectActiveTask} from "../../features/tasksSlice";
import {selectTags} from "../../features/tagsSlice";
import UserProfile from "../../components/UserProfile/UserProfile";
import './Dashboard.scss';
import DashboardLogo from "../../components/Dashboard/DashboardLogo";
import CategoriesList from "../../components/CategoriesList/CategoriesList";
import TagsList from "../../components/TagsList/TagsList";
import DashboardSidebarLine from "../../components/Dashboard/DashboardSidebarLine";
import Groups from "../Groups/Groups";
import Tasks from "../Tasks/Tasks";
import ActiveTask from "../../components/ActiveTask/ActiveTask";



function Dashboard(props) {

    const activeTask = useSelector(selectActiveTask);

    const tags = useSelector(selectTags);

    return (
        <div className="dashboard" style={activeTask ? {gridTemplateColumns: '280px 1fr 284px'} : {gridTemplateColumns: '280px 1fr 0'}}>
            <div className="dashboard__sidebar--left">
                <DashboardLogo/>
                <CategoriesList/>
                <DashboardSidebarLine/>
                <TagsList tags={tags}/>
                <UserProfile/>
            </div>
            <div className="dashboard__tasks">
                <Groups/>
                <Tasks/>
            </div>
            {
                activeTask &&
                <div className="dashboard__sidebar--right">
                        <ActiveTask
                            id={activeTask.id}
                            name={activeTask.name}
                            priority={activeTask.priority}
                            categoryId={activeTask.categoryId}
                            deadline={activeTask.deadline}
                            createdIn={activeTask.createdIn}
                            remindIn={activeTask.remindIn}
                            tags={activeTask.tags}
                            description={activeTask.description}
                        />
                </div>
            }

        </div>
    );
}

export default Dashboard;