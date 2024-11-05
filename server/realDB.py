import sqlite3

class MessagesDB:
    def __init__(self, filename):
        self.connection = sqlite3.connect(filename)
        self.cursor = self.connection.cursor()
    def getMessages(self):
        self.cursor.execute("SELECT * FROM messages")
        messages = self.cursor.fetchall()
        return messages
    def createMessage(self, message):
        self.cursor.execute("INSERT INTO messages(message)VALUES(?)", (message,))
        self.connection.commit()
        return 'Message Created'
    def deleteMessage(self, id):
        try:
            self.cursor.execute("DELETE FROM messages WHERE id = ?", (id,))
            self.connection.commit()
            if self.cursor.rowcount > 0:
                return "Message deleted successfully"
            else:
                return "No message found with the given id"
        except Exception as e:
            self.connection.rollback()
            raise e
    def markAsRead(self, id):
        self.cursor.execute("UPDATE messages SET read = 1 WHERE id = ?", (id,))
        self.connection.commit()
        return 'Message marked as read'

class ProjectDB:
    def __init__(self, filename):
        self.connection = sqlite3.connect(filename)
        # self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()
    def getProjects(self):
        self.cursor.execute("SELECT * FROM projects")
        projects = self.cursor.fetchall()
        return projects
    def getProject(self, id):
        self.cursor.execute("SELECT * FROM projects WHERE id = ?", (id))
        project = self.cursor.fetchone()
        return project
    def createProject(self, name, description, requirements, img, results, clientTech, apiTech, dbTech):
        self.cursor.execute("INSERT INTO projects(name, description, requirements, img, results, clientTech, apiTech, dbTech)VALUES(?,?,?,?,?,?,?,?)", (name, description, requirements, img, results, clientTech, apiTech, dbTech))
        self.connection.commit()
        return 'Project Created'

    def updateProject(self, id, name, description, requirements, img, results, clientTech, apiTech, dbTech):
        self.cursor.execute("""
            UPDATE projects 
            SET name = ?, description = ?, requirements = ?, img = ?, 
                results = ?, clientTech = ?, apiTech = ?, dbTech = ? 
            WHERE id = ?
        """, (name, description, requirements, img, results, clientTech, apiTech, dbTech, id))
        self.connection.commit()
        return 'Project Updated'
    def deleteProject(self, id):
        try:
            self.cursor.execute("DELETE FROM projects WHERE id = ?", (id,))
            self.connection.commit()
            if self.cursor.rowcount > 0:
                return True
            else:
                return False
        except Exception as e:
            self.connection.rollback()
            raise e
    