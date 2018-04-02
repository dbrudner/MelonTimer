import MediaQuery from 'react-responsive'
import React from 'react'
import NavBar from './navbar'
import MobileNav from './mobile-nav'

export default function NavMediQuery() {
    return (
        <div>
            <MediaQuery query="(min-device-width: 900px)">
                <NavBar/>
            </MediaQuery>
            <MediaQuery query="(max-device-width: 899px)">
                <MobileNav/>
            </MediaQuery>
        </div>
    )
}