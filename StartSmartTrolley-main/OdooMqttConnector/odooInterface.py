from typing import Iterable
import xmlrpc.client as odoo #odoo Schnittstelle
import os
import signal

class OdooInterface:
# Anmeldedaten

    url = "YOUR ODOO ACCOUNT API"
    db = "YOUR ODOO DATABASE LOCATION"
    username = "YOUR ODOO USERNAME"
    password = "YOUR ODOO PASSWORD"
    uid = -1
    odooClient = None

    def __init__(self, **kwargs):
        self.url, self.db, self.username, self.password = \
            kwargs.get('url', self.url), \
            kwargs.get('database', self.db), \
            kwargs.get('username', self.username), \
            kwargs.get('password', self.password)
        self.connect()

    def connect(self):
        # Verbindung zum Anmeldepunkt ({}/xmlrpc/2/common) wird aufgebaut
        authPoint = odoo.ServerProxy('{}/xmlrpc/2/common'.format(self.url))
        # Verbindung wird geprueft
        if authPoint.version()["protocol_version"] != 1:
            exit()
        # Anmeldung wird durchgefuehrt um userID zu erhalten
        self.uid = authPoint.authenticate(self.db, self.username, self.password, {})
        self.odooClient = odoo.ServerProxy('{}/xmlrpc/2/object'.format(self.url))

    def sendMessage(self, modelName, methodName, parametersArray, parametersDict = None) -> Iterable:
        try:
            if methodName == "write" :
                return self.odooClient.execute_kw(self.db, self.uid, self.password,
                modelName,
                methodName,
                parametersArray)

            return self.odooClient.execute_kw(self.db, self.uid, self.password,
                modelName,
                methodName,
                parametersArray,
                parametersDict)
        except:
            return ["Error"]
