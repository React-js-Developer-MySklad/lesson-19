import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ params } : any) {
    // throw new Error("Destroy has issue")
    await deleteContact(params.contactId);
    return redirect("/");
}