function retrieveHighestRole(member) {
    const [highestRole] = member.roles.cache.sort((a, b) => b.position - a.position).array();
    return highestRole;
}

const generalUtility = {
    retrieveHighestRole: retrieveHighestRole
}

module.exports = generalUtility;