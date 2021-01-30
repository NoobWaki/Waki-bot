module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('T\'est débile ?')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Mentionne celui que tu veux que je mute.')
        if (member.id === message.guild.ownerID) return message.channel.send('Wtf ?')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Euuhhh ?')
        if (!member.manageable) return message.channel.send('Mais wtf')
        const reason = args.slice(1).join(' ') || 'Raison : inconnue'
        const muteRole = message.guild.roles.cache.find(role => role.name === '🤐 | Mute')
        if (!muteRole) return message.channel.send('Il n\'y a pas de muterole.')
        await member.roles.remove(muteRole)
        message.channel.send(`**Tu peux parler, ${member} !**`)
    },
    name: 'unmute',
    guildOnly: true
}