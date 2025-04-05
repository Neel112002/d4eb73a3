import React from 'react';

const Header = () => {
return (
<header className="header col-md-12 row">
        <div className="left-section col-md-5">
            <span className="icon-circle">
                <i className="ti ti-phone fs-4 text-success"></i>
            </span>
            <span className="title p-3">Activity</span>
        </div>
        {/* <div className="angled-line position-absolute"></div> */}
        <div className="tabs col-md-2">
            <span className="tab active">Inbox</span>
        </div>
        <div className="tabs col-md-3">
            <span className="tab">All calls</span>
        </div>
        <div className="tabs col-md-2">
            <i class="ti ti-adjustments-alt fs-4"></i>
        </div>
</header>
);
};

export default Header;
