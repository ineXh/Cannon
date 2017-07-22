function ContactListener() {

  // Collision event functions!
  this.BeginContact = function(contact) {
    // Get both fixtures
    var f1 = contact.GetFixtureA();
    var f2 = contact.GetFixtureB();
    // Get both bodies
    var b1 = f1.GetBody();
    var b2 = f2.GetBody();

    // Get our objects that reference these bodies
    //var o1 = b1.GetUserData();
    //var o2 = b2.GetUserData();

    //console.log(b1.parent)
    //console.log(b2.parent)

    if(b1.parent.type == constants.ObjectType.Boundary && b2.parent.type == constants.ObjectType.Ball){
      b2.parent.bounceCount++;
      b2.parent.clr = color(255, 0, 0)
      return;
    }
    if(b1.parent.type == constants.ObjectType.Ball &&
       b2.parent.type == constants.ObjectType.Box){
       b1.parent.bounceCount++;
       b2.parent.bounceCount++;
     return;
    }
    if(b2.parent.type == constants.ObjectType.Ball &&
       b1.parent.type == constants.ObjectType.Box){
       b2.parent.bounceCount++;
       b1.parent.bounceCount++;
     return;
    }
    if(b1.parent.type == constants.ObjectType.Ball &&
       b2.parent.type == constants.ObjectType.Character){
       b2.parent.getShot(b1.parent);
     return;
    }
    if(b2.parent.type == constants.ObjectType.Ball &&
       b1.parent.type == constants.ObjectType.Character){
       b1.parent.getShot(b2.parent);
     return;
    }
  }; // end BeginContact

  // Objects stop touching each other
  this.EndContact = function(contact) {
    var f1 = contact.GetFixtureA();
    var f2 = contact.GetFixtureB();
    // Get both bodies
    var b1 = f1.GetBody();
    var b2 = f2.GetBody();
    if(b1.parent.type == constants.ObjectType.Boundary && b2.parent.type == constants.ObjectType.Ball){
      b2.parent.clr = color(255, 204, 0)
    }
  }; // end endContact

  this.PreSolve = function(contact,manifold) {
  };

  this.PostSolve = function(contact,manifold) {
  };
}
