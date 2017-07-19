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

    if(b1.type == constants.ObjectType.Boundary && b2.type == constants.ObjectType.Ball){
      b2.parent.clr = color(255, 0, 0)
    }
  };

  // Objects stop touching each other
  this.EndContact = function(contact) {
    var f1 = contact.GetFixtureA();
    var f2 = contact.GetFixtureB();
    // Get both bodies
    var b1 = f1.GetBody();
    var b2 = f2.GetBody();
    if(b1.type == constants.ObjectType.Boundary && b2.type == constants.ObjectType.Ball){
      b2.parent.clr = color(255, 204, 0)
    }
  };

  this.PreSolve = function(contact,manifold) {
  };

  this.PostSolve = function(contact,manifold) {
  };
}
