import {PasswordCheckStrength} from './models.ts'

export class PasswordCheckService {

    // Expected length of all passwords
    public static get MinimumLength(): number {
        return 5;
    }

    // Regex to check for a common password string - all based on 5+ length passwords
    private commonPasswordPatterns = /passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/;

    //
    // Checks if the given password matches a set of common password
    //
    public isPasswordCommon(password: string): boolean {
        return this.commonPasswordPatterns.test(password);
    }

    //
    // Returns the strength of the current password
    //
    public checkPasswordStrength(password: string): PasswordCheckStrength {

        let numberOfElements = 0;
        numberOfElements = /.*[a-z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Lowercase letters
        numberOfElements = /.*[A-Z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Uppercase letters
        numberOfElements = /.*[0-9].*/.test(password) ? ++numberOfElements : numberOfElements;      // Numbers
        numberOfElements = /[^a-zA-Z0-9]/.test(password) ? ++numberOfElements : numberOfElements;   // Special characters (inc. space)

        let currentPasswordStrength = PasswordCheckStrength.Short;

        if (password === null || password.length < PasswordCheckService.MinimumLength) {
            currentPasswordStrength = PasswordCheckStrength.Short;
        } else if (this.isPasswordCommon(password) === true) {
            currentPasswordStrength = PasswordCheckStrength.Common;
        } else if (numberOfElements === 0 || numberOfElements === 1 || numberOfElements === 2) {
            currentPasswordStrength = PasswordCheckStrength.Weak;
        } else if (numberOfElements === 3) {
            currentPasswordStrength = PasswordCheckStrength.Ok;
        } else {
            currentPasswordStrength = PasswordCheckStrength.Strong;
        }

        return currentPasswordStrength;
    }
}

export function getPasswordStrengthText(strengthValue: PasswordCheckStrength): string {
  switch (strengthValue) {
    case PasswordCheckStrength.Short:
      return "Short";
    case PasswordCheckStrength.Common:
      return "Common";
    case PasswordCheckStrength.Weak:
      return "Weak";
    case PasswordCheckStrength.Ok:
      return "Ok";
    case PasswordCheckStrength.Strong:
      return "Strong";
    default:
      return "Unknown";
  }
}