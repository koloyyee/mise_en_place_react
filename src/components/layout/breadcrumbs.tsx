import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "../ui/breadcrumb";

import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
export default function CommonBreadcrumbs() {


    const location = useLocation();
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);
    console.log(currentPath);


    const pathnames = currentPath.split("/");
    pathnames.map((path, index) => {
        const  href = `${pathnames.slice(0, index).join("/")}`
        return { href, label :  path.charAt(0).toUpperCase() + path.slice(1)}
    })
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* <BreadcrumbItem>
                    <BreadcrumbLink href="/app"></BreadcrumbLink>
                </BreadcrumbItem> */}
                {/* <BreadcrumbSeparator /> */}
                {pathnames.map((path, index) => {
                    const href = `${pathnames.slice(0, index + 1).join("/")}`;
                    const label = path.charAt(0).toUpperCase() + path.slice(1);
                    return (
                        <>
                        <BreadcrumbItem key={index}>
                            <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < pathnames.length - 1 ? <BreadcrumbSeparator key={index} /> : null}
                        </>
                    );
                })}
                {/* <BreadcrumbSeparator /> */}
            </BreadcrumbList>
        </Breadcrumb>

    );
}