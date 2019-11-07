import React, { useState } from 'react';
const usersData = [
{"id":"3SPT-20","DATA":{"METAL1":20,"METAL2":30}},
{"id":"3SPT-21","DATA":{"METAL1":20,"METAL2":30}},
{"id":"3SPT-22","DATA":{"METAL1":20,"METAL2":30}},
{"id":"3SPT-23","DATA":{"METAL1":20,"METAL2":30}},
{"id":"3SPT-24","DATA":{"METAL1":20,"METAL2":30}},
{"id":"3DE-02","DATA":{"RF":10}},
{"id":"3DE-03","DATA":{"RF":10}},
{"id":"3DE-02","DATA":{"RF":20}},
{"id":"3DE-02","DATA":{"RF":20}},
{"id":"3DE-04","DATA":{"RF":20}},
{"id":"3DE-05","DATA":{"RF":20}},
{"id":"3DE-06","DATA":{"RF":20}},
{"id":"3DE-07","DATA":{"RF":20}},
{"id":"3DE-08","DATA":{"RF":20}},



]

const distinctTool = [...new Set(usersData.map(x=>x.id))]
const SideMenu = () => (
<aside className="menu colums is-fullheight" >
<ul className='menu-list' id="side-menu">
    {distinctTool.map( x=> (
            <li key={x}><a>{x}</a></li>
            )   
        )
    }
</ul>
</aside>

);

export default SideMenu;