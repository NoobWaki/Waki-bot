module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('C\'est toi qui va te faire kick -_-')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Mentionne celui que tu veux que je kick.')
        if (member.id === message.guild.ownerID) return message.channel.send('On ne peut pas kick un membre du staff !')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('On ne peut pas kick un membre du staff !')
        if (!member.kickable) return message.channel.send('On ne peut pas kick un membre du staff !')
        const reason = args.slice(1).join(' ') || 'Raison : inconnue'
        await member.kick(reason)
        message.channel.send(`**${member.user.tag} **a été éliminé(e) !
https://media.discordapp.net/attachments/764611493375246361/785336079192424528/c35e7782bd63c938546f48ce6ada99a8.gif`)
    },
    name: 'kick',
    guildOnly: true
}