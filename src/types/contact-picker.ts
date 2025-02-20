interface ContactProperty {
  name: string;
  id: string;
}

interface ContactInfo {
  address: string[];
  email: string[];
  icon: Blob;
  name: string[];
  tel: string[];
}

interface ContactsManager {
  getProperties(): Promise<ContactProperty[]>;
  select(
    properties: string[],
    options?: { multiple?: boolean },
  ): Promise<ContactInfo[]>;
}

interface NavigatorContacts {
  contacts: ContactsManager;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars
interface Navigator extends NavigatorContacts {}
