import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
export default function CommonBreadcrumbs() {


    const location = useLocation();
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    const pathnames = currentPath.split("/");

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathnames.map((path, index) => {
                    const href = `${pathnames.slice(0, index + 1).join("/")}`;
                    const label = path.charAt(0).toUpperCase() + path.slice(1);
                    return (
                        <React.Fragment key={href + index + 10 + label}>
                            <BreadcrumbItem key={href + index + 10 + label}>
                                <BreadcrumbLink key={index + href} href={href}>{label}</BreadcrumbLink>
                            </BreadcrumbItem>
                            {index < pathnames.length - 1 ? <BreadcrumbSeparator key={index - 10 + label} /> : null}
                            {/* // </div> */}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>

    );
}