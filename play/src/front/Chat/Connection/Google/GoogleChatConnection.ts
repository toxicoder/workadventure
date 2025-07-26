import { Readable, writable } from "svelte/store";
import {
    ChatConnectionInterface,
    ChatRoom,
    ChatRoomMember,
    ChatRoomMembership,
    ChatRoomMembershipManagement,
    ChatUser,
    ConnectionStatus,
    CreateRoomOptions,
    RoomFolder,
} from "../ChatConnection";
import axios from "axios";

class GoogleChatRoom implements ChatRoom, ChatRoomMembershipManagement {
    constructor(
        public readonly id: string,
        public readonly name: Readable<string>,
        public readonly type: "direct" | "multiple",
        public readonly hasUnreadMessages: Readable<boolean>,
        public readonly avatarUrl: string | undefined,
        public readonly messages: Readable<readonly never[]>,
        public readonly isEncrypted: Readable<boolean>,
        public readonly typingMembers: Readable<never[]>,
        public readonly isRoomFolder: boolean,
        public readonly lastMessageTimestamp: number,
        public readonly myMembership: Readable<ChatRoomMembership>,
        public readonly members: Readable<ChatRoomMember[]>,
    ) {}

    sendMessage(message: string, threadId?: string): void {
        // Implement sending a message if necessary
    }

    sendFiles(files: FileList): Promise<void> {
        return Promise.resolve();
    }

    setTimelineAsRead(): void {
        // Implement setting timeline as read if necessary
    }

    hasPreviousMessage: Readable<boolean> = writable(false);

    loadMorePreviousMessages(): Promise<void> {
        return Promise.resolve();
    }

    startTyping(): Promise<object> {
        return Promise.resolve({});
    }

    stopTyping(): Promise<object> {
        return Promise.resolve({});
    }

    joinRoom(): Promise<void> {
        return Promise.resolve();
    }

    leaveRoom(): Promise<void> {
        return Promise.resolve();
    }
}

export class GoogleChatConnection implements ChatConnectionInterface {
    connectionStatus: Readable<ConnectionStatus> = writable("ONLINE");
    directRooms: Readable<(ChatRoom & ChatRoomMembershipManagement)[]> = writable([]);
    rooms: Readable<(ChatRoom & ChatRoomMembershipManagement)[]> = writable([]);
    invitations: Readable<ChatRoom[]> = writable([]);
    folders: Readable<RoomFolder[]> = writable([]);
    roomCreationInProgress: Readable<boolean> = writable(false);
    isEncryptionRequiredAndNotSet: Readable<boolean> = writable(false);
    isGuest: Readable<boolean> = writable(false);
    hasUnreadMessages: Readable<boolean> = writable(false);
    directRoomsUsers: Readable<ChatUser[]> = writable([]);
    shouldRetrySendingEvents: Readable<boolean> = writable(false);

    constructor() {
        console.log("GoogleChatConnection created");
    }

    async createRoom(roomOptions: CreateRoomOptions): Promise<{ room_id: string }> {
        const response = await axios.post<{ room_id: string }>("/api/google-chat/spaces", roomOptions);
        return response.data;
    }

    async createFolder(roomOptions: CreateRoomOptions): Promise<{ room_id: string }> {
        const response = await axios.post<{ room_id: string }>("/api/google-chat/spaces", { ...roomOptions, isFolder: true });
        return response.data;
    }

    async createDirectRoom(userChatId: string): Promise<ChatRoom & ChatRoomMembershipManagement> {
        const response = await axios.post<ChatRoom>("/api/google-chat/direct-messages", { userChatId });
        // Assuming the response is a standard ChatRoom, we wrap it in GoogleChatRoom
        const roomData = response.data;
        return new GoogleChatRoom(
            roomData.id,
            writable(roomData.name),
            roomData.type,
            writable(roomData.hasUnreadMessages),
            roomData.avatarUrl,
            writable([]), // messages
            writable(false), // isEncrypted
            writable([]), // typingMembers
            false, // isRoomFolder
            Date.now(), // lastMessageTimestamp
            writable("join"), // myMembership
            writable([]) // members
        );
    }

    getDirectRoomFor(userChatId: string): (ChatRoom & ChatRoomMembershipManagement) | undefined {
        // This should be implemented by searching through the existing direct rooms
        return undefined;
    }

    async searchAccessibleRooms(searchText: string): Promise<{ id: string; name: string | undefined; }[]> {
        const response = await axios.get<{ id: string; name: string | undefined; }[]>("/api/google-chat/spaces", { params: { searchText } });
        return response.data;
    }

    async joinRoom(roomId: string): Promise<ChatRoom | undefined> {
        const response = await axios.post<ChatRoom>(`/api/google-chat/spaces/${roomId}/join`);
        return response.data;
    }

    async destroy(): Promise<void> {
        // Nothing to do here
    }

    async searchChatUsers(searchText: string): Promise<{ id: string; name: string | undefined; }[] | undefined> {
        const response = await axios.get<{ id:string; name: string | undefined; }[]>("/api/google-chat/users", { params: { searchText } });
        return response.data;
    }

    async initEndToEndEncryption(): Promise<void> {
        // Not supported by Google Chat
    }

    clearListener(): void {
        // Nothing to do here
    }

    async isUserExist(address: string): Promise<boolean> {
        try {
            await axios.get(`/api/google-chat/users/${address}`);
            return true;
        } catch (error) {
            return false;
        }
    }

    getRoomByID(roomId: string): ChatRoom {
        // This should be implemented by fetching the room from the backend
        throw new Error("Method not implemented.");
    }

    async retrySendingEvents(): Promise<void> {
        // Not supported by Google Chat
    }
}
