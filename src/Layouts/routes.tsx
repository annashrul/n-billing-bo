import {Home,users,Invest,Ticket,poinTf,tiketTf,Deposit,Withdraw,History,Genealogy} from 'icons';


const Routes=[
    {
        link:'/',
        title:'Home',
        icon: Home,
        routes:[]
    },
    {
        link:'/tenant',
        title:'Tenant',
        icon: users,
        routes:[]
    },
    {
        link:'/service',
        title:'Service',
        icon: Genealogy,
        routes:[]
    },
    {
        link:'/billing',
        title:'Billing',
        icon: Ticket,
        routes:[]
    },
]

export default Routes;