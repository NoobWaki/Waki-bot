module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('C\'est toi qui va te faire ban -_-')
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Mentionne celui que tu veux que je tue :)')
        if (member.id === message.guild.ownerID) return message.channel.send('On ne peut pas ban un membre du staff !')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('On ne peut pas mute un membre du staff !')
        if (!member.bannable) return message.channel.send('On ne peut pas mute un membre du staff !')
        const reason = args.slice(1).join(' ') || 'Raison : inconnue'
        await member.ban({reason})
        message.channel.send(`**${member.user.tag} **a été supprimé(e) du serveur par 「ZA HANDO」 !
        https://media.discordapp.net/attachments/764611493375246361/784941839274868736/1505580655_za_hando.gif`)
    },
    name: 'ban',
    guildOnly: true
}