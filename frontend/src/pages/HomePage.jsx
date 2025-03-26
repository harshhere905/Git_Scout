import {useCallback, useEffect, useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
const HomePage = () => {
	const [userProfile, setUserProfile] = useState(null);
    const [repos,setRepos]= useState([]);
    const [loading, setLoading] = useState(false);
    const [sortType, setSortType]= useState("recent");
    const getuserprofile = useCallback(async (username = "harshhere905") => {
        setLoading(true);
        try {
            const res = await fetch(`/api/users/profile/${username}`);
            if (!res.ok) {
                throw new Error(`Failed to fetch user profile: ${res.statusText}`);
            }
            const data = await res.json();
            if (!data || !data.userProfile) {
                throw new Error("User profile not found");
            }
            data.repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setRepos(data.repos || []);
            setUserProfile(data.userProfile || {});
            return data;
        } catch (error) {
            console.error("Error fetching user profile:", error);
            toast.error(error.message);
            return { userProfile: null, repos: [] };
        } finally {
            setLoading(false);
        }
    }, []);
    
    useEffect(()=>{
       getuserprofile();
    },[getuserprofile]);
    const onSearch = async(e,username)=>{
        e.preventDefault();
        setLoading(true);
        setRepos([]);
        setUserProfile(null);
        const {userProfile,repos}= await getuserprofile(username);
        setUserProfile(userProfile);
        setRepos(repos);
        setLoading(false);
        setSortType("recent");
    }
    const onSort=(sortType)=>{
        if(sortType==="recent"){
            repos.sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
        }
        else if(sortType==="stars"){
            repos.sort((a,b)=>b.stargazers_count-a.stargazers_count);
        }
        else if(sortType==="forks"){
            repos.sort((a,b)=>b.forks_count-a.forks_count);
        }
        setSortType(sortType);
        setRepos([...repos]);
    }
    return (
		<div className='m-4'>
			<Search onSearch={onSearch}/>
			{repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType}/>}
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
				{userProfile && !loading &&<ProfileInfo userProfile={userProfile} />}
				{!loading && <Repos repos={repos}/>}
				{loading && <Spinner/>}
			</div>
		</div>
	);
};
export default HomePage;