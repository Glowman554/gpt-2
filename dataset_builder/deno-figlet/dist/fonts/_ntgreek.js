
  export default {
  "name": "ntgreek",
  "font": "flf2a$ 9 7 13 15 30\nNTGreek by Bruce Jakeway--based on Standard by Glenn Chappell & Ian Chai\nQuestions and comments regarding ntgreek.flf to pbjakeway@neumann.uwaterloo.ca\nFor figlet release 2.0\nDate:  1994 Apr 2\n\nExplanation of first line:\nflf2 - \"magic number\" for file identification\na    - should always be `a', for now\n$    - the \"hardblank\" -- prints as a blank, but can't be smushed\n9    - height of a character\n7    - height of a character, not including descenders\n13   - max line length (excluding comment lines) + a fudge factor\n15   - default smushmode for this font (like \"-m 15\" on command line)\n30   - number of comment lines\n\nGreek keyboard maps:\n\nAll keys map to those in standard except:\n\nalpha   = A,a   lambda  = L,l   phi            = F,f   rough breathing  = (\nbeta    = B,b   mu      = M,m   chi            = C,c   smooth breathing = )\ngamma   = G,g   nu      = N,n   psi            = Y,y   acute accent     = '\ndelta   = D,d   xi      = X,x   omega          = w,w   grave accent     = `\nepsilon = E,e   omicron = O,o   script theta   = J     diaresis         = ^\nzeta    = Z,z   pi      = P,p   script phi     = j\neta     = H,h   rho     = R,r   final sigma    = V\ntheta   = Q,q   sigma   = S,s   omega bar      = v\niota    = I,i   tau     = T,t   raised period  = :\nkappa   = K,k   upsilon = U,u   iota subscript = _\n\n$@\n$@\n$@\n$@\n$@\n$@\n$@\n$@\n$@@\n   @\n _ @\n| |@\n| |@\n|_|@\n _ @\n(_)@\n   @\n   @@\n      @\n _  _ @\n( )( )@\n V  V @\n      @\n      @\n   $  @\n      @\n      @@\n           @\n   _   _   @\n _| |_| |_ @\n(_   _   _)@\n _| |_| |_ @\n(_   _   _)@\n  |_| |_|  @\n           @\n           @@\n    _    @\n  _| |_  @\n /    _) @\n( (| |_  @\n \\_    \\ @\n  _| |) )@\n (_   _/ @\n   |_|   @\n         @@\n       @\n _   __@\n(_) / /@\n   / / @\n  / /  @\n / / _ @\n/_/ (_)@\n       @\n       @@\n        @\n  ___   @\n /   \\  @\n \\ O /  @\n / _ \\/\\@\n( (_>  <@\n \\___/\\/@\n        @\n        @@\n   @\n   @\n //@\n// @\n   @\n   @\n   @\n   @\n   @@\n  @\n  @\n  @\n((@\n  @\n  @\n  @\n  @\n  @@\n  @\n  @\n  @\n))@\n  @\n  @\n  @\n  @\n  @@\n      @\n      @\n__/\\__@\n\\    /@\n/_  _\\@\n  \\/  @\n      @\n      @\n      @@\n       @\n       @\n   _   @\n _| |_ @\n(_   _)@\n  |_|  @\n       @\n       @\n       @@\n   @\n   @\n $ @\n   @\n   @\n _ @\n( )@\n|/ @\n   @@\n       @\n       @\n       @\n _____ @\n(_____)@\n       @\n   $   @\n       @\n       @@\n   @\n   @\n $ @\n   @\n   @\n _ @\n(_)@\n   @\n   @@\n       @\n     __@\n    / /@\n   / / @\n  / /  @\n / /   @\n/_/    @\n       @\n       @@\n       @\n  ___  @\n / _ \\ @\n| | | |@\n| | | |@\n| |_| |@\n \\___/ @\n       @\n       @@\n   @\n _ @\n/ |@\n- |@\n| |@\n| |@\n|_|@\n   @\n   @@\n       @\n ____  @\n(___ \\ @\n  __) )@\n / __/ @\n| |___ @\n|_____)@\n       @\n       @@\n       @\n _____ @\n(__  / @\n  / /  @\n (__ \\ @\n ___) )@\n(____/ @\n       @\n       @@\n        @\n    _   @\n  /  |  @\n / o |_ @\n/__   _)@\n   | |  @\n   |_|  @\n        @\n        @@\n       @\n ____  @\n|  __) @\n| |__  @\n|___ \\ @\n ___) )@\n(____/ @\n       @\n       @@\n       @\n   __  @\n  / /  @\n / /_  @\n| '_ \\ @\n| (_) )@\n \\___/ @\n       @\n       @@\n       @\n _____ @\n(___  )@\n  _/ / @\n (  _) @\n / /   @\n/_/    @\n       @\n       @@\n       @\n  ___  @\n /   \\ @\n \\ O / @\n / _ \\ @\n( (_) )@\n \\___/ @\n       @\n       @@\n       @\n  ___  @\n / _ \\ @\n( (_) |@\n \\__, |@\n   / / @\n  /_/  @\n       @\n       @@\n   @\n   @\n $ @\n _ @\n(_)@\n   @\n $ @\n   @\n   @@\n   @\n   @\n   @\n _ @\n(_)@\n _ @\n( )@\n|/ @\n   @@\n     @\n   __@\n  / /@\n / / @\n< <  @\n \\ \\ @\n  \\_\\@\n     @\n     @@\n       @\n       @\n _____ @\n(_____)@\n _____ @\n(_____)@\n       @\n       @\n       @@\n     @\n__   @\n\\ \\  @\n \\ \\ @\n  > >@\n / / @\n/_/  @\n     @\n     @@\n     @\n ___ @\n(__ \\@\n  / /@\n |_| @\n  _  @\n (_) @\n     @\n     @@\n          @\n   _____  @\n  / ___ \\ @\n / /   | |@\n( ( () | |@\n \\ \\____/_@\n  \\______/@\n          @\n          @@\n       @\n  ___  @\n / _ \\ @\n| |_| |@\n|  _  |@\n| | | |@\n|_| |_|@\n       @\n       @@\n       @\n ____  @\n|  _ \\ @\n| |_) )@\n|  _ ( @\n| |_) )@\n|____/ @\n       @\n       @@\n       @\n__   __@\n\\ \\ / /@\n \\ v / @\n  > <  @\n / ^ \\ @\n/_/ \\_\\@\n       @\n       @@\n          @\n          @\n    /\\    @\n   /  \\   @\n  / /\\ \\  @\n / /__\\ \\ @\n/________\\@\n          @\n          @@\n       @\n _____ @\n|  ___)@\n| |_   @\n|  _)  @\n| |___ @\n|_____)@\n       @\n       @@\n         @\n    _    @\n  _| |_  @\n /     \\ @\n( (| |) )@\n \\_   _/ @\n   |_|   @\n         @\n         @@\n       @\n _____ @\n|  ___)@\n| |$   @\n| |$   @\n| |    @\n|_|    @\n       @\n       @@\n       @\n _   _ @\n| | | |@\n| |_| |@\n|  _  |@\n| | | |@\n|_| |_|@\n       @\n       @@\n     @\n ___ @\n(   )@\n | | @\n | | @\n | | @\n(___)@\n     @\n     @@\n           @\n    ___    @\n   / _ \\   @\n  ( (_| |_ @\n _ \\ _   _)@\n| |___| |  @\n \\_____/   @\n           @\n           @@\n       @\n _   __@\n| | / /@\n| |/ / @\n|   <  @\n| |\\ \\ @\n|_| \\_\\@\n       @\n       @@\n          @\n          @\n    /\\    @\n   /  \\   @\n  / /\\ \\  @\n / /  \\ \\ @\n/_/    \\_\\@\n          @\n          @@\n         @\n __   __ @\n|  \\ /  |@\n|   v   |@\n| |\\_/| |@\n| |   | |@\n|_|   |_|@\n         @\n         @@\n       @\n _   _ @\n| \\ | |@\n|  \\| |@\n|     |@\n| |\\  |@\n|_| \\_|@\n       @\n       @@\n       @\n  ___  @\n / _ \\ @\n| | | |@\n| | | |@\n| |_| |@\n \\___/ @\n       @\n       @@\n         @\n _______ @\n(   _   )@\n | | | | @\n | | | | @\n | | | | @\n |_| |_| @\n         @\n         @@\n        @\n  ____  @\n / __ \\ @\n| |__| |@\n|  __  |@\n| |__| |@\n \\____/ @\n        @\n        @@\n       @\n ____  @\n|  _ \\ @\n| |_) )@\n|  __/ @\n| |    @\n|_|    @\n       @\n       @@\n       @\n______ @\n\\  ___)@\n \\ \\   @\n  > >  @\n / /__ @\n/_____)@\n       @\n       @@\n       @\n _____ @\n(_   _)@\n  | |  @\n  | |  @\n  | |  @\n  |_|  @\n       @\n       @@\n         @\n __   __ @\n(_ \\ / _)@\n  \\ v /  @\n   | |   @\n   | |   @\n   |_|   @\n         @\n         @@\n       @\n       @\n       @\n  ____ @\n / ___)@\n( (__  @\n \\__ \\ @\n   _) )@\n  (__/ @@\n          @\n   ____   @\n  / __ \\  @\n | |  | | @\n | |  | | @\n _\\ \\/ /_ @\n(___||___)@\n          @\n          @@\n       @\n _____ @\n(_____)@\n  ___  @\n (___) @\n _____ @\n(_____)@\n       @\n       @@\n         @\n _  _  _ @\n| || || |@\n| \\| |/ |@\n \\_   _/ @\n   | |   @\n   |_|   @\n         @\n         @@\n       @\n ______@\n(___  /@\n   / / @\n  / /  @\n / /__ @\n/_____)@\n       @\n       @@\n ___ @\n|  _)@\n| |  @\n| |  @\n| |  @\n| |  @\n| |_ @\n|___)@\n     @@\n       @\n__     @\n\\ \\    @\n \\ \\   @\n  \\ \\  @\n   \\ \\ @\n    \\_\\@\n       @\n       @@\n ___ @\n(_  |@\n  | |@\n  | |@\n  | |@\n  | |@\n _| |@\n(___|@\n     @@\n       @\n _   _ @\n(_) (_)@\n       @\n       @\n       @\n       @\n       @\n       @@\n  @\n  @\n  @\n  @\n  @\n  @\n  @\n  @\n||@@\n   @\n   @\n\\\\ @\n \\\\@\n   @\n   @\n   @\n   @\n   @@\n        @\n        @\n        @\n  __  __@\n /  \\/ /@\n( ()  < @\n \\__/\\_\\@\n        @\n        @@\n       @\n  ___  @\n / _ \\ @\n| |_) )@\n|  _ < @\n| |_) )@\n|  __/ @\n| |    @\n|_|    @@\n       @\n       @\n       @\n__   __@\n\\ \\ / /@\n \\ v / @\n  > <  @\n / ^ \\ @\n/_/ \\_\\@@\n       @\n   __  @\n  / _) @\n  \\ \\  @\n / _ \\ @\n( (_) )@\n \\___/ @\n       @\n       @@\n     @\n     @\n     @\n ___ @\n/ __)@\n> _) @\n\\___)@\n     @\n     @@\n         @\n    _    @\n   | |   @\n  _| |_  @\n /     \\ @\n( (| |) )@\n \\_   _/ @\n   | |   @\n   |_|   @@\n       @\n       @\n       @\n _   _ @\n( \\ / )@\n \\ v / @\n  | |  @\n  | |  @\n  |_|  @@\n       @\n       @\n       @\n _ __  @\n| '_ \\ @\n| | | |@\n|_| | |@\n    | |@\n    |_|@@\n    @\n    @\n    @\n _  @\n| | @\n| | @\n \\_)@\n    @\n    @@\n         @\n         @\n         @\n _   __  @\n| | /  \\ @\n| || || )@\n \\_   _/ @\n   | |   @\n   |_|   @@\n      @\n      @\n      @\n _  __@\n| |/ /@\n|   < @\n|_|\\_\\@\n      @\n      @@\n       @\n__     @\n\\ \\    @\n \\ \\   @\n  > \\  @\n / ^ \\ @\n/_/ \\_\\@\n       @\n       @@\n       @\n       @\n       @\n _   _ @\n| | | |@\n| |_| |@\n| ._,_|@\n| |    @\n|_|    @@\n      @\n      @\n      @\n _  __@\n| |/ /@\n| / / @\n|__/  @\n      @\n      @@\n       @\n       @\n       @\n  ___  @\n / _ \\ @\n( (_) )@\n \\___/ @\n       @\n       @@\n        @\n        @\n        @\n ______ @\n(  __  )@\n | || | @\n |_||_| @\n        @\n        @@\n       @\n  ___  @\n / _ \\ @\n| |_| |@\n|  _  |@\n| |_| |@\n \\___/ @\n       @\n       @@\n       @\n       @\n       @\n  ___  @\n / _ \\ @\n| |_) )@\n|  __/ @\n| |    @\n|_|    @@\n       @\n       @\n       @\n  ____ @\n /  ._)@\n( () ) @\n \\__/  @\n       @\n       @@\n     @\n     @\n     @\n ___ @\n(   )@\n | | @\n  \\_)@\n     @\n     @@\n       @\n       @\n       @\n _   _ @\n| | | |@\n| |_| |@\n \\___/ @\n       @\n       @@\n           @\n           @\n           @\n _________ @\n(  _____  )@\n| |_/ \\_| |@\n \\___^___/ @\n           @\n           @@\n           @\n           @\n           @\n  __   __  @\n / / _ \\ \\ @\n| |_/ \\_| |@\n \\___^___/ @\n           @\n           @@\n__     @\n\\ \\__  @\n > __) @\n( (_   @\n > _)  @\n( (__  @\n \\__ \\ @\n    ) )@\n   (_/ @@\n         @\n         @\n         @\n _  _  _ @\n| || || |@\n| \\| |/ |@\n \\_   _/ @\n   | |   @\n   |_|   @@\n       @\n_____  @\n\\__  ) @\n  / /  @\n / /   @\n| |__  @\n \\__ \\ @\n    ) )@\n   (_/ @@\n   __@\n  / /@\n | | @\n | | @\n< <  @\n | | @\n | | @\n  \\_\\@\n     @@\n _ @\n| |@\n| |@\n| |@\n| |@\n| |@\n| |@\n|_|@\n   @@\n__   @\n\\ \\  @\n | | @\n | | @\n  > >@\n | | @\n | | @\n/_/  @\n     @@\n     @\n /\\/|@\n|/\\/ @\n     @\n     @\n     @\n     @\n     @\n     @@\n _   _ @\n(_)_(_)@\n / _ \\ @\n| |_| |@\n|  _  |@\n| | | |@\n|_| |_|@\n       @\n       @@\n _   _ @\n(_)_(_)@\n / _ \\ @\n| | | |@\n| | | |@\n| |_| |@\n \\___/ @\n       @\n       @@\n _   _ @\n(_) (_)@\n| | | |@\n| | | |@\n| | | |@\n| |_| |@\n \\___/ @\n       @\n       @@\n       @\n       @\n _   _ @\n(_)_(_)@\n / _` |@\n( (_| |@\n \\__,_|@\n       @\n       @@\n       @\n       @\n _   _ @\n(_)_(_)@\n / _ \\ @\n( (_) )@\n \\___/ @\n       @\n       @@\n       @\n       @\n _   _ @\n(_) (_)@\n| | | |@\n| |_| |@\n \\__,_|@\n       @\n       @@\n       @\n  ___  @\n / _ \\ @\n| | ) )@\n| |< < @\n| | ) )@\n| ||_/ @\n|_|    @\n       @@\n"
}

  