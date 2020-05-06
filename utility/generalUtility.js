//Declare function "retrieveHighestRole" to retrieve the role object of the highest role that the user currently has.
function retrieveHighestRole(member) {
    //Deconstruct the first element of a sorted array consisting of ascending to descending roles that the member has.
    const [highestRole] = member.roles.cache.sort((a, b) => b.position - a.position).array();
    //Return the role object.
    return highestRole;
}

//Declare an object called: "generalUtility", so it can be exported and called upon when we want to use any of our general utility functions.
const generalUtility = {
    retrieveHighestRole: retrieveHighestRole
}

//Export the generalUtility object, so we can call this module on the fly if we ever need it.
module.exports = generalUtility;