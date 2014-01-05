function Bunny(game){
    var texture = PIXI.Texture.fromImage("resources/bunny.png");
    PIXI.Sprite.call(this,texture);
    
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.position.x = 200;
    this.position.y = 0;
    this.game = game;
    this.remainingJumpSteps = 0;
    this.bottomContactCount = 0;
    
    //add in code for physics lib
    var fixDef = new box2d.b2FixtureDef();
    var polygonShape = new box2d.b2PolygonShape();

    polygonShape.SetAsBox((this.width / 2) / SCALE,(this.height / 2) / SCALE);
    fixDef.shape = polygonShape;
    fixDef.density = 1;
    fixDef.friction = 0.5;
    fixDef.restitution = .1;

    var sensorFixDef = new box2d.b2FixtureDef();
    polygonShape.SetAsBox(0.3, 0.3, new box2d.b2Vec2(0, -2), 0);

    sensorFixDef.shape = polygonShape;
    sensorFixDef.density = 1;
    sensorFixDef.friction = 0.5;
    sensorFixDef.isSensor = true;

    var bodyDef = new box2d.b2BodyDef();
    bodyDef.type = box2d.b2Body.b2_dynamicBody;
    bodyDef.position.x = this.position.x / SCALE;
    bodyDef.position.y = this.position.y / SCALE;
    fixDef.shape = new box2d.b2PolygonShape();
    fixDef.shape.SetAsBox(this.width / SCALE, this.height / SCALE);
    
    //add the body property to this object for tracking position with the b2 lib
    this.body = game.world.CreateBody(bodyDef);
    this.body.CreateFixture(fixDef);
    var footSensor = this.body.CreateFixture(sensorFixDef);
    footSensor.SetUserData(3);

    this.listener = new box2d.b2ContactListener;
    this.listener.BeginContact = this.beginContact.bind(this); 
    this.listener.EndContact = this.endContact.bind(this); 
    this.listener.PostSolve = this.postSolve.bind(this); 
    this.listener.PreSolve = this.preSolve.bind(this); 

    game.world.SetContactListener(this.listener);
 
}
Bunny.constructor = Bunny;
Bunny.prototype = Object.create(PIXI.Sprite.prototype);

Bunny.DELTA_MOVEMENT = 2;

Bunny.prototype.update = function(){
    
    
    if(game.isKeyDown){
        for(var i in game.keysPressed){
            switch (game.keysPressed[i]){
                case 38:
                    if(this.bottomContactCount > 0 && this.remainingJumpSteps < 1){ 
                        var vec = new box2d.b2Vec2(0,this.body.GetMass() * 200);
                        this.body.ApplyImpulse(vec, this.body.GetWorldCenter());
                        this.remainingJumpSteps = 15;
                    }
                break;
            }
        }
    }
    
    if(this.remainingJumpSteps > 0){
        this.remainingJumpSteps -= 1;
    }
    
    this.position.y = this.body.GetPosition().y * SCALE;
    //this.position.x = this.body.GetPosition().x * SCALE;
}

Bunny.prototype.beginContact = function(contact){
    var userData = contact.GetFixtureA().GetUserData();
    if(userData != null){
        if(userData == 3){
            this.bottomContactCount += 1;
        }
    }
    userData = contact.GetFixtureB().GetUserData();
    if(userData != null){
        if(userData == 3){
            this.bottomContactCount += 1;
        }
    }
}

Bunny.prototype.endContact = function(contact){
    var userData = contact.GetFixtureA().GetUserData();
    if(userData != null){
        if(userData == 3){
            this.bottomContactCount -= 1;
        }
    }

    userData = contact.GetFixtureB().GetUserData();
    if(userData != null){
        if(userData == 3){
            this.bottomContactCount -= 1;
        }
    }
}

Bunny.prototype.postSolve = function(contact,impulse){
}

Bunny.prototype.preSolve = function(contact,oldManifold){
}

