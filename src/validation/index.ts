/**
 * Class representing the user controller
 * @class Validation
 * @description validation
 */


class Validate {
  
  static isEmail(email:string): boolean {
    const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/ig;
    return re.test(email);
  }

  static isValidParamsLength(param:any, length:number):boolean {
    return param.length < length;
  }



  static checkEmpty(input:any): boolean {
    const re = /^$/;
    const testBody = re.test(input);
    return testBody;
  }

  static containsNumber(name:any):boolean{
    const re = /[0-9]/g;
    const testName = re.test(name);
    return testName;
  }

  static validImage(image:string){
    const re = /(.jpg|.jpeg|.png|.gif)$/g;
    return image.match(re);
  }
  
  static isMatchingPassword(password:string, confirmPassword:string):boolean {
    return password === confirmPassword;
  }
  static itsaNumber(item:any):boolean {
    const re = /^[-+]?\d*$/;
    return re.test(item);
  }

}

export default Validate;