---
title: How to reset password in Ubuntu
template: templates/post.pug
date: 2014-01-06
author: Lenin Hasda
---
Hello and happy new year 😀

This is new year and again I started digging my ubuntu. Recently I forgot my password and I couldn’t install or do any terminal command without it!!! 🙁

After googling for some time I found some easy steps to reset the password which I thought I should share with you.

To reset your password first you have enter the recovery mode in ubuntu. So if your machine is turned on, reboot it and **after the BIOS screen** hold down the left shift key. You should be prompted with following screen:

![ubuntu os options](/img/0002/ubuntu-os-options.png)

> Ubuntu in version 13.10 (which I was using) and above you won’t be seeing this menu. Rather you will have a different listing of menus. From where you have to select and enter Advanced Ubuntu Options to get above menu listing

Now from here select the one with **“( recovery mode )”** with it. You should see the following menu:

![recovery menu](/img/002/recovery-menu.png)

From the listing select and enter **“root“**. You should be on recovery command line mode on recovery command line mode you should see something like this:

```bash
root@ubuntu:~#
```

Where **root** is the username and **ubuntu** is the machine name *( username@machine-name)*. At this stage you should have a read-only filesystem, so you have to remount it with write permissions using command: `mount -rw -o remount /`. your command should look like this:

```bash	
root@ubuntu:~# mount -rw -o remount /
```

Cool, now you are ready to reset your password using passwd command. It will look like this:

```bash
root@ubuntu:~# passwd username
Enter new UNIX password:
Retype new UNIX password:
passwd: password updated successfully
root@ubuntu:~#
```

> – you have to change the username with your username
> – while entering your new password nothing will appear in the screen so make sure you type them correctly

Type in what you want the new password to be in the prompt. After that hit the reboot command to restart your machine and their you have it. You have successfully reset the password for your ubuntu machine 🙂


------


**Ref:**    
* http://askubuntu.com/questions/24006/how-do-i-reset-a-lost-administrative-password
