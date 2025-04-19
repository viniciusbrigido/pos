package br.com.cargidoso.medmap.config;

import br.com.cargidoso.medmap.entity.User;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MedmapContext {

    private static final ThreadLocal<User> currentUser = ThreadLocal.withInitial(() -> null);

    public static User getCurrentUser() {
        return currentUser.get();
    }

    public static void setCurrentUser(User user) {
        currentUser.set(user);
    }

    public static void clear() {
        currentUser.remove();
    }
}
