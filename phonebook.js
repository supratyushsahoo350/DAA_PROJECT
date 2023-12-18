const readline = require('readline');

class DNode {
    constructor(name, number, gmail) {
        this.name = name;
        this.number = number;
        this.gmail = gmail;
        this.prev = null;
        this.next = null;
    }
}

class DList {
    constructor() {
        this.head = null;
        this.temp = null;
        this.ptr = null;
        this.ptr1 = null;
        this.ptr2 = null;
        this.dup = null;
        this.prevn = null;
    }

    async accept() {
        let ans;
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        do {
            let name = await this.question("Enter Name: ");
            let number = await this.question("Enter Number: ");
            while (number.length !== 10) {
                number = await this.question("Enter Valid Number: ");
            }
            let gmail = await this.question("Enter Gmail: ");
            this.temp = new DNode(name, number, gmail);
            if (!this.head) {
                this.head = this.temp;
            } else {
                this.ptr = this.head;
                while (this.ptr.next) {
                    this.ptr = this.ptr.next;
                }
                this.ptr.next = this.temp;
                this.temp.prev = this.ptr;
            }
            ans = await this.question("Do you want to continue? (y/n) ");
        } while (ans.toLowerCase() === 'y');
        rl.close();
    }

    async question(prompt) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            rl.question(prompt, (answer) => {
                resolve(answer);
            });
        });
    }

    display() {
        this.ptr = this.head;
        while (this.ptr) {
            console.log("\n\nNAME  ::\t", this.ptr.name);
            console.log("NUMBER::\t+91-", this.ptr.number);
            console.log("G-MAIL::\t", this.ptr.gmail);
            this.ptr = this.ptr.next;
        }
    }

    insert() {
        this.accept();
    }

    sort() {
        let temp, n;
        for (let i = this.head; i.next; i = i.next) {
            for (let j = i.next; j; j = j.next) {
                temp = i.name.localeCompare(j.name);
                if (temp > 0) {
                    n = i.name;
                    i.name = j.name;
                    j.name = n;
                }
            }
        }
    }

    deleteContact(s) {
        let c = 0;
        this.ptr = this.head;
        while (this.ptr) {
            if (s === this.ptr.name) {
                c = 1;
                break;
            } else {
                c = 2;
            }
            this.ptr = this.ptr.next;
        }
        if (c === 1 && this.ptr !== this.head && this.ptr.next) {
            this.ptr.prev.next = this.ptr.next;
            this.ptr.next.prev = this.ptr.prev;
            delete this.ptr;
            console.log("Contact successfully deleted.\n");
        }
        if (this.ptr === this.head) {
            this.head = this.head.next;
            this.head.prev = null;
            delete this.ptr;
            console.log("Contact successfully deleted.\n");
        }
        if (!this.ptr.next) {
            this.ptr.prev.next = null;
            this.ptr.prev = null;
            delete this.ptr;
            console.log("Contact successfully deleted.\n");
        }
        if (c === 2) {
            console.log("The entered name is not in the list.");
        }
    }

    deleteSameName() {
        this.ptr1 = this.head;
        while (this.ptr1 && this.ptr1.next) {
            this.ptr2 = this.ptr1;
            while (this.ptr2.next) {
                if (this.ptr1.name === this.ptr2.next.name) {
                    this.dup = this.ptr2.next;
                    this.ptr2.next = this.ptr2.next.next;
                    delete this.dup;
                } else {
                    this.ptr2 = this.ptr2.next;
                }
            }
            this.ptr1 = this.ptr1.next;
        }
    }

    deleteSameGmail() {
        this.ptr1 = this.head;
        while (this.ptr1 && this.ptr1.next) {
            this.ptr2 = this.ptr1;
            while (this.ptr2.next) {
                if (this.ptr1.gmail === this.ptr2.next.gmail) {
                    this.dup = this.ptr2.next;
                    this.ptr2.next = this.ptr2.next.next;
                    delete this.dup;
                } else {
                    this.ptr2 = this.ptr2.next;
                }
            }
            this.ptr1 = this.ptr1.next;
        }
    }

    deleteSameNumber() {
        this.ptr1 = this.head;
        while (this.ptr1 && this.ptr1.next) {
            this.ptr2 = this.ptr1;
            while (this.ptr2.next) {
                if (this.ptr1.number === this.ptr2.next.number) {
                    this.dup = this.ptr2.next;
                    this.ptr2.next = this.ptr2.next.next;
                    delete this.dup;
                } else {
                    this.ptr2 = this.ptr2.next;
                }
            }
            this.ptr1 = this.ptr1.next;
        }
    }

    searchByName(na) {
        this.ptr = this.head;
        while (this.ptr) {
            if (na === this.ptr.name) {
                console.log("Name found");
                console.log("Contact details are below:\n");
                console.log("\n\nNAME  ::\t", this.ptr.name);
                console.log("NUMBER::\t+91-", this.ptr.number);
                console.log("G-MAIL::\t", this.ptr.gmail);
                break;
            }
            this.ptr = this.ptr.next;
        }
    }

    searchByNumber(num) {
        this.ptr = this.head;
        while (this.ptr) {
            if (num === this.ptr.number) {
                console.log("Number found\n");
                console.log("Contact details are below:\n");
                console.log("\n\nNAME  ::\t", this.ptr.name);
                console.log("NUMBER::\t+91-", this.ptr.number);
                console.log("G-MAIL::\t", this.ptr.gmail);
                break;
            }
            this.ptr = this.ptr.next;
        }
    }

    searchByGmail(gm) {
        this.ptr = this.head;
        while (this.ptr) {
            if (gm === this.ptr.gmail) {
                console.log("Gmail found\n");
                console.log("Contact details are below:\n");
                console.log("\n\nNAME  ::\t", this.ptr.name);
                console.log("NUMBER::\t+91-", this.ptr.number);
                console.log("G-MAIL::\t", this.ptr.gmail);
                break;
            }
            this.ptr = this.ptr.next;
        }
    }

    async update(n) {
        let ans;
        let c;
        this.ptr = this.head;
        while (this.ptr) {
            if (n === this.ptr.name) {
                do {
                    console.log("\nWhat do you want to update?");
                    console.log("1. Name");
                    console.log("2. Phone Number");
                    console.log("3. G-Mail");
                    c = await this.question("Enter your choice: ");
                    switch (parseInt(c)) {
                        case 1:
                            this.ptr.name = await this.question("Enter new name: ");
                            break;
                        case 2:
                            this.ptr.number = await this.question("Enter new phone number: ");
                            while (this.ptr.number.length !== 10) {
                                this.ptr.number = await this.question("Enter valid number: ");
                            }
                            break;
                        case 3:
                            this.ptr.gmail = await this.question("Enter new G-Mail: ");
                            break;
                        default:
                            console.log("\nNo proper input given.");
                    }
                    ans = await this.question("Do you want to continue updating? (y/n) ");
                } while (ans.toLowerCase() === 'y');
            }
            this.ptr = this.ptr.next;
        }
    }
}

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let name = await question("What is your name? ");
    console.log("Welcome, " + name + "!");
    let d1 = new DList();
    let ans;
    let ch;
    do {
        console.log("************** PHONE BOOK ********************");
        console.log("\n\nWelcome " + name + "!\n");
        console.log("\n\nLet's create our phonebook " + name + "\n");
        await d1.accept();
        d1.sort();
        do {
            console.log("\n\n1. Display your phone book");
            console.log("2. Insert new contact");
            console.log("3. Update details on existing contact");
            console.log("4. Delete contact");
            console.log("5. Delete same name in phonebook");
            console.log("6. Delete same numbers in phonebook");
            console.log("7. Search");
            ch = await question("Enter your choice: ");
            switch (parseInt(ch)) {
                case 2:
                    await d1.insert();
                    d1.sort();
                    break;
                case 1:
                    d1.display();
                    break;
                case 3:
                    let n = await question("Enter the name of person whose details you want to update: ");
                    await d1.update(n);
                    d1.sort();
                    break;
                case 4:
                    let deleteName = await question("Enter the name you want to delete from phonebook: ");
                    d1.deleteContact(deleteName);
                    break;
                case 5:
                    d1.deleteSameName();
                    d1.display();
                    break;
                case 6:
                    d1.deleteSameNumber();
                    d1.display();
                    break;
                case 7:
                    do {
                        let a = await question("1. Search by Name\n2. Search by Number\n3. Search by Gmail ");
                        switch (parseInt(a)) {
                            case 1:
                                let searchName = await question("Enter the name to be searched: ");
                                d1.searchByName(searchName);
                                break;
                            case 2:
                                let searchNumber = await question("Enter the number to be searched: ");
                                d1.searchByNumber(searchNumber);
                                break;
                            case 3:
                                let searchGmail = await question("Enter the Gmail to be searched: ");
                                d1.searchByGmail(searchGmail);
                                break;
                            default:
                                console.log("No proper input given.");
                        }
                        ans = await question("Do you want to continue searching? (y/n) ");
                    } while (ans.toLowerCase() === 'y');
                    break;
                default:
                    console.log("No proper input given.");
            }
            ans = await question("Do you want to continue operations? (y/n) ");
        } while (ans.toLowerCase() === 'y');
    } while (ans.toLowerCase() === 'y');

    rl.close();
}

async function question(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
}

main();
