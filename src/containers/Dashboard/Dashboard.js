import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {setCategories} from "../../features/categoriesSlice";
import {useSelector} from "react-redux";
import {selectCategories} from "../../features/categoriesSlice";
import {selectTags} from "../../features/tagsSlice";
import UserProfile from "../../components/UserProfile/UserProfile";
import './Dashboard.scss';
import DashboardLogo from "../../components/Dashboard/DashboardLogo";
import CategoriesList from "../../components/CategoriesList/CategoriesList";
import TagsList from "../../components/TagsList/TagsList";
import DashboardSidebarLine from "../../components/Dashboard/DashboardSidebarLine";
import Groups from "../Groups/Groups";
import Tasks from "../Tasks/Tasks";


function Dashboard(props) {


    const tags = useSelector(selectTags);

    return (
        <div className="dashboard">
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
            <div className="dashboard__sidebar--right">
                <p>Complete the report</p>
            </div>
        </div>
    );
}

export default Dashboard;