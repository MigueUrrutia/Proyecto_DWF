package sv.edu.udb.panventury_service.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import sv.edu.udb.panventury_service.model.Usuario;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private Usuario usuario;
}
