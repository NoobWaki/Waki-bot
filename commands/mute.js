module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('T\'est débile ?')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Mentionne celui que tu veux que je mute.')
        if (member.id === message.guild.ownerID) return message.channel.send('Wtf ?')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('On ne peut pas mute un membre du staff !')
        if (!member.manageable) return message.channel.send('On ne peut pas mute un membre du staff !')
        const reason = args.slice(1).join(' ') || 'Raison : inconnue'
        let muteRole = message.guild.roles.cache.find(role => role.name === '🤐 | Mute')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: '🤐 | Mute',
                    permissions: 0
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }))
        }
        await member.roles.add(muteRole)
        message.channel.send(`**${member} a été réduit au silence !**`)
    },
    name: 'mute',
    guildOnly: true
}