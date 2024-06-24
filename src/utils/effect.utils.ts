import {useEffect} from "react";

export const useLogger = (subject: string) => {
    useEffect(() => {
        console.log(`${subject}: did mount`)
        return () => {
            console.log(`${subject}: did unmount`)
        }
    }, []);

    useEffect(() => {
        console.log(`${subject}: did update`)
    });

}