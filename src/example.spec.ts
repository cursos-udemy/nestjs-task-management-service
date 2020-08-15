class FriendList {
  friends = [];

  addFirend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    console.log(`${name} is now a friend!`);
  }

  removeFriend(name) {
    const friend = this.friends.find(f => f == name);
    if (!friend) throw Error('Friend Not Found');
    this.friends = this.friends.filter(f => f != name);
  }
}

xdescribe('my test', () => {
  it('returns true ', () => {
    expect(true).toBeTruthy();
  });
});

xdescribe('FriendList', () => {
  let friendList;

  beforeEach(() => {
    this.friendList = new FriendList();
  });

  it('Initialize friend list', () => {
    expect(this.friendList.friends.length).toEqual(0);
  });

  it('add friend to list', () => {
    this.friendList.addFirend('Mollo');
    expect(this.friendList.friends.length).toEqual(1);
  });

  it('Announce Friendship', () => {
    this.friendList.announceFriendship = jest.fn();
    expect(this.friendList.announceFriendship).not.toHaveBeenCalled();
    this.friendList.addFirend('Mollo');
    expect(this.friendList.announceFriendship).toHaveBeenCalled();
    expect(this.friendList.announceFriendship).toHaveBeenCalledWith('Mollo');
  });

  it('remove friend', () => {
    this.friendList.addFirend('Mollo');
    expect(this.friendList.friends.length).toEqual(1);
  });

  describe('Remove Friends', () => {
    it ('remove a friend from the list', () => {
      this.friendList.addFirend('Mollo');
      expect(this.friendList.friends[0]).toEqual('Mollo');
      this.friendList.removeFriend('Mollo');
      expect(this.friendList[0]).toBeUndefined();
      expect(this.friendList.friends.length).toEqual(0);
    });

    it ('throws an error as friend does not exist ', () => {
      expect(()=> this.friendList.removeFriend('Mollo')).toThrow(Error)
    });
  })

});